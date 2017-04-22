var MainCtrl = angular.module('MainCtrl', ['apiService','ui.bootstrap']);

MainCtrl.controller('MainCtrl',['$scope','apiService','$sce',function($scope,api,$sce) {

	console.log("in the main ctrl");
	$scope.songs = [];

	$scope.config = {
		sources: [
	      {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/audios/videogular.mp3"), type: "audio/mpeg"},
	      {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/audios/videogular.ogg"), type: "audio/ogg"}
	  ],
		theme: {
  			url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
		}
	};

	api.getSongs(function(res){

		$scope.songs = res; 

		console.log($scope.songs);

		$scope.current = $scope.songs[0];

	},function(res){
		console.log(res);
	})

}]);
