var app = angular.module('foodHygieneApp', []);
app.controller('RatingCtrl', function ($scope, $http) {
    $scope.loading = true;
    $http({
        method: 'GET',
        url: 'http://api.ratings.food.gov.uk/Authorities',
        headers: {'Accept': 'application/json', 'x-api-version': '2'}
    }).success(function (data) {
        $scope.authorities = data.authorities;
        $scope.loading = false;
    })
        .error(function (data, status, header, config) {
            $scope.errorMessage = "There is a problem retrieving data, please try again later."
            $scope.loading = false;
        });

    $scope.getRatingDistribution = function () {
        $scope.loading = true;
        $http({
            method: 'GET',
            url: 'http://api.ratings.food.gov.uk/Establishments?localAuthorityId=' + $scope.authorityId,
            headers: {'Accept': 'application/json', 'x-api-version': '2'}
        }).success(function (data) {
            var establishments = data.establishments;
            var total = establishments.length;
            var count = [];
            var categories = [];
            for (var i = 0; i < total; i++) {
                var ratingValue = establishments[i].RatingValue;
                if (ratingValue in count) {
                    count[ratingValue]++;
                } else {
                    categories.push(ratingValue);
                    count[ratingValue] = 0;
                }
            }

            var distributions = [];
            for (var i = 0; i < categories.length; i++) {
                var category = categories[i];
                var distribution = {};
                distribution.name = category;
                distribution.percentage = roundNumber(count[category] / total);
                distributions.push(distribution);
            }
            $scope.distributions = distributions;
            $scope.loading = false;

        })
            .error(function (data, status, header, config) {
                $scope.errorMessage = "There is a problem retrieving data, please try again later."
                $scope.loading = false;
            });
    }

    $scope.clearTable = function () {
        $scope.distributions = undefined;
        $scope.errorMessage = undefined;
    }

    function roundNumber(number) {
        return Math.round(number * 10000) / 100;
    }
});


