var app = angular.module('FaroApp', []).config(function($interpolateProvider){
    	$interpolateProvider.startSymbol('{@').endSymbol('@}');
	}
);