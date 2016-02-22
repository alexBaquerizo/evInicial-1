
angular.module("MiProyecto", [])
	.controller("FirstController", function($scope, $http){
		$scope.posts = [];
		$http.get("http://localhost:1337/cuestionario")
			.success(function(data){
				console.log(data);
				$scope.posts = data;
			})

			.error(function(err){
				console.log(err);
			});

	});
