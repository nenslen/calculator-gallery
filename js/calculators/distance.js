angular.module('calculatorApp').controller('distance', ['$scope', function($scope) {
	let title = 'Distance';
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
		manhattanDistance: new Output('Manhattan (L1)', 0, 'number'),
		euclideanDistance: new Output('Euclidean (L2)', 0, 'number')
	};
	
	let calculate = function() {
		let point1 = this.inputs.point1.value.split(',');
		let point2 = this.inputs.point2.value.split(',');
		point1 = cleanArray(point1);
		point2 = cleanArray(point2);
		this.outputs.euclideanDistance.value = 0;
		this.outputs.manhattanDistance.value = 0;

		if (point1.length !== point2.length) {
			this.errors = ['Points must have the same number of coordinates'];
			return;
		}

		for (let i = 0; i < point1.length; i++) {
			let p1 = parseFloat(point1[i]);
			let p2 = parseFloat(point2[i]);
			this.outputs.manhattanDistance.value += Math.abs(p1 - p2);
			this.outputs.euclideanDistance.value += Math.pow(p1 - p2, 2);
		}
		this.outputs.euclideanDistance.value = Math.sqrt(this.outputs.euclideanDistance.value);

		this.errors = [];
		this.truncateOutputs();
	};

	$scope.calc = new Calculator(title, name, description, inputs, outputs, calculate);
	$scope.initializeCalculator($scope.calc);
}]);
