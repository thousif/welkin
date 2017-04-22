'use strict';

var welkin = angular.module('welkin', 
    [   "apiService",
        "MainCtrl",
        "ngSanitize",
        "com.2fdevs.videogular",
        "com.2fdevs.videogular.plugins.controls"
    ]
);
	
welkin.constant('constants',{
  "cokestudio_url" : "http://starlord.hackerearth.com/sureify/cokestudio",
});
