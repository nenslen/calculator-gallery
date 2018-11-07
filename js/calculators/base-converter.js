angular.module('calculatorApp').controller('base-converter', ['$scope', function($scope) {
	let title = 'Base Converter';
	let name = 'base-converter';
	let description = [
		'Converts between different bases'
	];

	let inputs = {
		bin: new Input('Binary', '', 'eg) 1011'),
		dec: new Input('Decimal', '', 'eg) 1236'),
		hex: new Input('Hexadecimal', '', 'eg) 6E3A')
	};

	let outputs = {};
	
	let calculate = function(type) {
		console.log(inputs[type]);

		this.errors = [];
		this.truncateOutputs();
	};

	$scope.calc = new Calculator(title, name, description, inputs, outputs, calculate);
	$scope.initializeCalculator($scope.calc);
}]);
