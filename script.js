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
    $scope.matches = [];
    $scope.secondMatches = [];

    $scope.compareMatches = function() {
        // need to add class '.compare' to 

        console.log('hello');
        $scope.secondMatches=[];
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
                        $scope.secondMatches.push(match);

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
                        if (match) {
                            $scope.secondMatches.push(match);
                        } else {
                            alert('Team not found!');
                        }
                    }
                }
            })
            .catch(function(err) {
                console.error(err);
            })
    }

    $scope.getBets = function() {
        console.log('hello');
        $scope.matches=[];
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
                        $scope.matches.push(match);

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
                        $scope.matches.push(match);
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