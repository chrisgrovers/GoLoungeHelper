// gosugamers has info on past matches
// csgolounge has percentage wins
    // data on who won
var betHelper = angular.module('betHelper', [])

betHelper.controller('MainController', function($scope, csgolounge) {
    var bets = 'sup';
    $scope.getBets = function() {
        console.log('hello');
        csgolounge.getStats()
            .then(function(data) {
                console.log('sup');
                this.bets = data;
            })
            .catch(function(err) {
                console.error(err);
            })
    }
})

betHelper.factory('csgolounge', function($http) {

    var getStats = function() {
        return $http({
            method: 'GET',
            dataType: 'jsonp',
            url: 'http://csgo.hvalrossen.dk/'
        })
        .then(function(resp) {
            console.log('inside getstats then');
            console.log(resp.data);
            return resp.data;
        });
    }
    return {
        getStats: getStats
    }
})