'use strict';

var welkin = angular.module('welkin', 
    [   
        'apiService',
        'MainCtrl',
        'ngSanitize',
    ]
);
	
welkin.constant('constants',{
  "cokestudio_url" : "http://starlord.hackerearth.com/sureify/cokestudio",
});
