// gosugamers has info on past matches
// csgolounge has percentage wins
    // data on who won
var betHelper = angular.module('betHelper', [])

betHelper.controller('MainController', function($scope, csgolounge) {
    //welcome message?
    $scope.teamName = "TEAM NAME HERE";
    $scope.matches = {
        all: []
    };

    $scope.getBets = function() {
        console.log('hello');
        csgolounge.getStats()
            .then(function(data) {
            // resp.data should be a big list of all matches in csgolounge
            // need to filter this data by input name
            // input should match either "team_a" or "team_b"
                // for each object that matches, push to object array
                console.log(this.text);
                var teamName = $scope.teamName;
                // really bad. Do I really want to iterate over 3000 objects?
                for (var i = 0; i < data.matches.length; i++) {
                    var currentMatch = data.matches[i]
                    if (currentMatch.team_a === teamName) {
                        console.log('a match was found!');
                        var match = {
                            vs: currentMatch.team_b,
                            odds: currentMatch.team_a_odd,
                            date: currentMatch.match_date,
                            link: currentMatch.match_link,
                            type: currentMatch.match_type,
                            won: (currentMatch.winner === teamName)
                        }
                        $scope.matches.all.push(match);

                    } else if (currentMatch.team_b === teamName) {
                        console.log('a match was found!');
                        var match = {
                            vs: currentMatch.team_a,
                            odds: currentMatch.team_b_odd,
                            date: currentMatch.match_date,
                            link: currentMatch.match_link,
                            type: currentMatch.match_type,
                            won: (currentMatch.winner === teamName)
                        }
                        $scope.matches.all.push(match);
                    }
                }
                console.log('matches data');
                console.dir($scope.matches);
                $scope.bets = $scope.matches;
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

    return {
        getStats: getStats
    }
})
