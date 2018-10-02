angular.module('calculatorApp', []).controller('app-controller', ['$scope', function($scope) {
	$scope.colors = [
		'default',
		'blue',
		'red',
		'white',
		'dark-grey',
		'dark-red',
		'dark-blue',
		'green',
		'purple',
		'yellow',
		'dark-cyan',
		'orange'
	];
	$scope.colorScheme = 'default';
	$scope.selectColorScheme = 'blue';
	$scope.errors = [];

	$scope.changeColorScheme = function() {
		if ($scope.colorScheme !== 'default') {
			$scope.selectColorScheme = $scope.colorScheme;
			$scope.disabledColorScheme = $scope.colorScheme;
		} else {
			$scope.selectColorScheme = 'blue';
			$scope.disabledColorScheme = '';
		}
	};
}]);

function cleanArray(array) {
	array = array.filter(i=>i!='');
	return array;
}
