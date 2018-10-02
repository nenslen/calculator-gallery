angular.module('calculatorApp').controller('distance', ['$scope', function($scope) {
	let DEFAULT_CALC_TYPE = 'Euclidean';
	let DEFAULT_POINT1 = '';
	let DEFAULT_POINT2 = '';
	let DEFAULT_DISTANCE = 0;

	$scope.title = 'Distance Calculator';
	$scope.description = [
		'Calculates the distance between 2 points. Points must be entered as a list of numbers separated by a comma.',
		'eg) 3,6,7'
	];

	$scope.point1 = DEFAULT_POINT1;
	$scope.point2 = DEFAULT_POINT2;
	$scope.euclideanDistance = DEFAULT_DISTANCE;
	$scope.manhattanDistance = DEFAULT_DISTANCE;

	$scope.calculate = function() {
		let point1 = $scope.point1.split(',');
		let point2 = $scope.point2.split(',');
		point1 = cleanArray(point1);
		point2 = cleanArray(point2);
		$scope.euclideanDistance = 0;
		$scope.manhattanDistance = 0;

		if (point1.length !== point2.length) {
			$scope.errors = ['Points must have the same number of coordinates'];
			return;
		}

		// Manhattan (L1)
		for (let i = 0; i < point1.length; i++) {
			let p1 = parseFloat(point1[i]);
			let p2 = parseFloat(point2[i]);
			$scope.manhattanDistance += Math.abs(p1 - p2);
		}

		// Euclidean (L2)
		for (let i = 0; i < point1.length; i++) {
			let p1 = parseFloat(point1[i]);
			let p2 = parseFloat(point2[i]);
			$scope.euclideanDistance += Math.pow(p1 - p2, 2);
		}
		$scope.euclideanDistance = Math.sqrt($scope.euclideanDistance);

		// Max

		$scope.errors = [];
	};

	$scope.reset = function() {
		$scope.calcType = DEFAULT_CALC_TYPE;
		$scope.point1 = DEFAULT_POINT1;
		$scope.point2 = DEFAULT_POINT2;
		$scope.euclideanDistance = DEFAULT_DISTANCE;
		$scope.manhattanDistance = DEFAULT_DISTANCE;
		$scope.errors = [];
	};
}]);
