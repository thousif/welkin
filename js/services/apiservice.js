'use strict';

var apiService = angular.module('apiService', ['ngResource']);

apiService.factory('apiService',['$http','$resource','constants', function($http,$resource,constants) {

	var getSongsUrl = constants.cokestudio_url;
	var getSongsAPI = $resource(getSongsUrl);

	var getSongs = function(successCallback,failureCallback){
		getSongsAPI.query({},function(res){
			successCallback(res);
		},function(res){
			failureCallback(res);
		})
	}

	return{
		getSongs : getSongs
	}
	

}]);