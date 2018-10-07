angular.module('calculatorApp').controller('distance', ['$scope', function($scope) {
	let title = 'Distance Calculator';
	let name = 'distance';
	let description = [
		'Calculates the distance between 2 points. Points must be entered as a list of numbers separated by a comma.',
		'eg) 3,6,7'
	];
	let inputs = {
		point1: new Input('Point 1', '', 'eg) 1,2,3'),
		point2: new Input('Point 2', '', 'eg) 4,5,6')
	};
	let outputs = {
		manhattanDistance: new Output('Manhattan (L1)', 0),
		euclideanDistance: new Output('Euclidean (L2)', 0)
	};
	let colorTheme = $scope.colorThemes.red;

	$scope.calc = new Calculator(title, name, description, inputs, outputs, colorTheme);

	$scope.calculate = function() {
		let point1 = $scope.calc.inputs.point1.value.split(',');
		let point2 = $scope.calc.inputs.point2.value.split(',');
		console.log(point1);
		console.log(point2);
		point1 = cleanArray(point1);
		point2 = cleanArray(point2);
		$scope.calc.outputs.euclideanDistance.value = 0;
		$scope.calc.outputs.manhattanDistance.value = 0;

		if (point1.length !== point2.length) {
			$scope.calc.errors = ['Points must have the same number of coordinates'];
			return;
		}

		for (let i = 0; i < point1.length; i++) {
			let p1 = parseFloat(point1[i]);
			let p2 = parseFloat(point2[i]);
			$scope.calc.outputs.manhattanDistance.value += Math.abs(p1 - p2);
			$scope.calc.outputs.euclideanDistance.value += Math.pow(p1 - p2, 2);
		}
		$scope.calc.outputs.euclideanDistance.value = Math.sqrt($scope.calc.outputs.euclideanDistance.value);

		$scope.calc.errors = [];
	};

	$scope.changeColorTheme = function(colorTheme)  {
		$scope.calc.colorTheme = colorTheme;
	};
}]);
