// gosugamers has info on past matches
// csgolounge has percentage wins
    // data on who won


// pull data from each individual player on each team?
    // k/d ratio next to player names
    // favorite map, etc, etc.

var betHelper = angular.module('betHelper', [])

betHelper.controller('MainController', function($scope, csgolounge) {
    //welcome message?

    $scope.teamName = "TEAM NAME HERE";
    $scope.compareName = "Compare A Team";
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
        // need to add class '.compare' to 

        console.log('hello');
        $scope.secondMatches.all=[];
        csgolounge.getStats()
            .then(function(data) {
            // resp.data should be a big list of all matches in csgolounge
            // need to filter this data by input name
            // input should match either "team_a" or "team_b"
                // for each object that matches, push to object array
                // really bad. Do I really want to iterate over 3000 objects?
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
            // need to filter this data by input name
            // input should match either "team_a" or "team_b"
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

    var getStats = function() {
        var url = 'http://csgo.hvalrossen.dk/'
        return $http({
            method: 'GET',
            dataType: 'jsonp',
            url: url
        })
        .then(function(resp) {
            // needs to handle cross origin request.
            // Workaround is with chrome extension for now
            console.log('inside getstats then');
             console.dir(resp.data);
            return resp.data;
        });
    }

    //comparestats
    //only needs to run through list of current matches. Check vs in matches var.
    var compareTeams = function() {

    }

    var percentageWins = function() {

    }

    return {
        getStats: getStats
    }
})


// function myCtrl($scope) {
//     $scope.toggleClass = function() {
//      var myEl = angular.element( document.querySelector( '#divID' ) );
//      myEl.toggleClass('red');     
//     }
// }