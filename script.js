// gosugamers has info on past matches
// csgolounge has percentage wins
    // data on who won


// pull data from each individual player on each team?
    // k/d ratio next to player names
    // favorite map, etc, etc.

var betHelper = angular.module('betHelper', [])

betHelper.controller('MainController', function($scope, csgolounge) {

    $scope.teamName = "TEAM NAME HERE";
    $scope.compareName = "Compare A Team";
    $scope.urlDrop = "Drop csgolounge URL"
    $scope.compareBox = [];
    $scope.matches = {
        all: [],
        9:[0,0],
        8:[0,0],
        7:[0,0],
        6:[0,0],
        5:[0,0],
        4:[0,0],
        3:[0,0],
        2:[0,0],
        1:[0,0]
    };

    $scope.secondMatches = {
        all: [],
        9:[0,0],
        8:[0,0],
        7:[0,0],
        6:[0,0],
        5:[0,0],
        4:[0,0],
        3:[0,0],
        2:[0,0],
        1:[0,0]
    };

    $scope.getUrl = function() {
        var url = $scope.urlDrop;

        var matchId = url.substr(url.length - 4);
        console.log("This is the matchId:", matchId);
        csgolounge.getNames()
            .then(function(data) {
                console.log('line 53. Currently trying to get here');
                console.log('this is matchId', matchId);
                console.log('first teamName:', data[0].b);
                console.log('data.matches.length is:', data.length);
                for (var l = 0; l < data.length; l++) {
                    if (data[l].match === matchId) {
                        console.log('team b', data[l].b);
                        $scope.compareName = data[l].b;
                        $scope.teamName = data[l].a;
                    }
                }
            
            })
            .catch(function(err) {
                console.error(err);
            });

        console.log('compare name', $scope.compareName, 'team name', $scope.teamName)
        console.log('getting bets');
        $scope.getBets();
        console.log('comparing matches');
        $scope.compareMatches();

    }

    $scope.compareNumbers = function() {
        for (var k = 0; k < $scope.matches.all.length; k++) {
            if ($scope.matches.all[k].vs === $scope.compareName) {
                $scope.compareBox.push($scope.matches.all[k]);
            }
        }
    }

    $scope.percentage = function(match, list) {
        var odds = match.odds.slice(0,2);
        var result = match.won;
        if (odds > 90) {
            list[9][1]++;
            if (result) {
                list[9][0]++;
            }
        } else if (odds > 80) {
            list[8][1]++;
            if (result) {
                list[8][0]++;
            }
        } else if (odds > 70) {
            list[7][1]++;
            if (result) {
                list[7][0]++;
            }
        } else if (odds > 60) {
            list[6][1]++;
            if (result) {
                list[6][0]++;
            }
        } else if (odds > 50) {
            list[5][1]++;
            if (result) {
                list[5][0]++;
            }
        } else if (odds > 40) {
            list[4][1]++;
            if (result) {
                list[4][0]++;
            }
        } else if (odds > 30) {
            list[3][1]++;
            if (result) {
                list[3][0]++;
            }
        } else if (odds > 20) {
            list[2][1]++;
            if (result) {
                list[2][0]++;
            }
        } else  {
            list[1][1]++;
            if (result) {
                list[1][0]++;
            }
        }
    }

    $scope.compareMatches = function() {

        console.log('hello');
        $scope.secondMatches.all=[];
        csgolounge.getStats()
            .then(function(data) {
                for (var i = 0; i < data.matches.length; i++) {
                    var currentMatch = data.matches[i]
                    if (currentMatch.team_a === $scope.compareName) {
                        console.log('a match was found!');
                        var match = {
                            vs: currentMatch.team_b,
                            odds: currentMatch.team_a_odd,
                            date: currentMatch.match_date,
                            link: currentMatch.match_link,
                            type: currentMatch.match_type,
                            won: (currentMatch.winner === $scope.compareName)
                        }
                        $scope.percentage(match, $scope.secondMatches);
                        $scope.secondMatches.all.push(match);

                    } else if (currentMatch.team_b === $scope.compareName) {
                        console.log('a match was found!');
                        var match = {
                            vs: currentMatch.team_a,
                            odds: currentMatch.team_b_odd,
                            date: currentMatch.match_date,
                            link: currentMatch.match_link,
                            type: currentMatch.match_type,
                            won: (currentMatch.winner === $scope.compareName)
                        }
                        $scope.percentage(match, $scope.secondMatches);
                        $scope.secondMatches.all.push(match);
                    }
                }
                $scope.compareNumbers();
            })
            .catch(function(err) {
                console.error(err);
            })
    }

    $scope.getBets = function() {
        console.log('hello');
        $scope.matches.all=[];
        csgolounge.getStats()
            .then(function(data) {
            // resp.data should be a big list of all matches in csgolounge
                // for each object that matches, push to object array
                // really bad. Do I really want to iterate over 3000 objects?
                for (var i = 0; i < data.matches.length; i++) {
                    var currentMatch = data.matches[i]
                    if (currentMatch.team_a === $scope.teamName) {
                        console.log('a match was found!');
                        var match = {
                            vs: currentMatch.team_b,
                            odds: currentMatch.team_a_odd,
                            date: currentMatch.match_date,
                            link: currentMatch.match_link,
                            type: currentMatch.match_type,
                            won: (currentMatch.winner === $scope.teamName)
                        }
                        $scope.percentage(match, $scope.matches);
                        $scope.matches.all.push(match);

                    } else if (currentMatch.team_b === $scope.teamName) {
                        console.log('a match was found!');
                        var match = {
                            vs: currentMatch.team_a,
                            odds: currentMatch.team_b_odd,
                            date: currentMatch.match_date,
                            link: currentMatch.match_link,
                            type: currentMatch.match_type,
                            won: (currentMatch.winner === $scope.teamName)
                        }
                        $scope.percentage(match, $scope.matches);
                        $scope.matches.all.push(match);
                        console.dir($scope.matches);
                    }
                }
            })
            .catch(function(err) {
                console.error(err);
            })
    }
})

betHelper.factory('csgolounge', function($http) {

    // Needed in order to match up to date matchID's
    var getNames = function() {
        var url = 'http://csgolounge.com/api/matches'
        // 'http://csgo.hvalrossen.dk/'
        //  return $http.jsonp('/path/to/api/service?callback=JSON_CALLBACK')
        //     .success(function (data) {
        //         console.log(data);
        //     });
        // }

        return $http({
            method: 'GET',
            dataType: 'JSONP',
            url: url
        })
        .then(function(resp) {
            // needs to handle cross origin request.
            // Workaround is with chrome extension for now
            // cross origin request is server side.
            return resp.data;
        });

    }

    // gets actual info to be used
    var getStats = function() {
        var url = 'http://csgo.hvalrossen.dk/'

        return $http({
            method: 'GET',
            dataType: 'JSONP',
            url: url
        })
        .then(function(resp) {
            // needs to handle cross origin request.
            // Workaround is with chrome extension for now
            // cross origin error is server side.
            return resp.data;
        });
    }

    //comparestats
    //only needs to run through list of current matches. Check vs in matches var.
    return {
        getStats: getStats,
        getNames: getNames
    }
})
