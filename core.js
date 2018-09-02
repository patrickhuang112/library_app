var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
   $scope.submit= function(){
      var data = $.param({
        user: JSON.stringify({
            name: $scope.name,
            password : $scope.password,
            
        })
      });

      $http.post("/api/verify", data).success(function(data, status) {
        console.log('Logged in Sucessfully');
      })
   }

   console.log('hello');
});