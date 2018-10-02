angular.module('calculatorApp').controller('square', ['$scope', function($scope) {
	let DEFAULT_X = 0;
	let DEFAULT_Y = 0;

	$scope.title = 'Square Calculator';
	$scope.description = ['This calculator takes a number, and returns its square.'];
	$scope.x = DEFAULT_X;
	$scope.y = DEFAULT_Y;

	$scope.calculate = function() {
		$scope.y = $scope.x * $scope.x;
	};

	$scope.reset = function() {
		$scope.x = DEFAULT_X;
		$scope.y = DEFAULT_Y;
	};
}]);
