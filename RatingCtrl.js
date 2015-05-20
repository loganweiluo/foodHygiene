var app = angular.module('foodHygieneApp',[]);
app.controller('RatingCtrl', function ($scope,$http){

    var url = 'http://ratings.food.gov.uk/authorities/json/?callback=JSON_CALLBACK';

    $http({
        method: 'JSONP',
        url: url
    }).success(function(data, status , header, config){
        alert('Success')
    })
        .error(function(data, status , header, config){
            alert('error')
        });

//    $http(request).success(function(data) {
//            $scope.authorities = data.ArrayOfWebLocalAuthorityAPI;
//            console.log($scope.authorities.size);
//            for(var i=0;i<$scope.authorities.size; i++){
//                var authority = $scope.authorities[i];
//                console.log(authority.LocalAuthorityId+"-"+authority.Name);
//            }
//        });

});
