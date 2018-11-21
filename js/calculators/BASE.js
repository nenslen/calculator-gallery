angular.module('calculatorApp').controller('square', ['$scope', function($scope) {
	let title = 'Square';
	let name = 'square';
	let description = ['line1', 'line2'];
	
	let inputs = {
		x: new Input('X', '', 'eg) 5')
	};
	
	let outputs = {
		y: new Output('Y', 0, 'number')
	};
	
	let calculate = function() {
		let x = this.inputs.x.value;
		this.outputs.y.value = x * x;
		this.errors = [];
		this.truncateOutputs();
	};

	$scope.calc = new Calculator(title, name, description, inputs, outputs, calculate);
	$scope.initializeCalculator($scope.calc);
}]);
