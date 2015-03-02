'use strict';

/**
 * @ngdoc function
 * @name angularCambridgeClassApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularCambridgeClassApp
 */
app.controller('MainCtrl', function($scope, tabletopData) {

	$scope.data = tabletopData;
	$scope.jsonData = $scope.data[0].Sheet1.elements;

	console.log('google spreadsheet data: ', $scope.jsonData);

});
