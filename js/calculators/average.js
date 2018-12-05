angular.module('calculatorApp').controller('average', ['$scope', function($scope) {
	let title = 'Average';
	let name = 'average';
	let description = ['Takes a list of numbers and calculates the 3 basic averages, as well as the range'];
	
	let inputs = {
		numbers: new Input('Numbers', '', 'eg) 5,23,6.5')
	};
	
	let outputs = {
		mean: new Output('Mean', 0, 'number'),
		median: new Output('Median', 0, 'number'),
		mode: new Output('Mode', 0, 'text'),
		range: new Output('Range', 0, 'number'),
	};
	
	let calculate = function() {
		let numbers = this.inputs.numbers.value.split(',');
		numbers = cleanArray(numbers);
		numbers = numbers
			.map(function(number) {
		    	return math.bignumber(number);
			})
			.sort(function(a, b) {
				return a - b;
			});

		if (numbers != '') {
			this.outputs.mean.value = math.mean(numbers);
			this.outputs.median.value = math.median(numbers);
			this.outputs.mode.value = mode(numbers);
			this.outputs.range.value = range(numbers);
		} else {
			this.outputs.mean.value = 0;
			this.outputs.median.value = 0;
			this.outputs.mode.value = 'n/a';
			this.outputs.range.value = 0;
		}

		this.errors = [];
		this.truncateOutputs();
	};

	$scope.calc = new Calculator(title, name, description, inputs, outputs, calculate);
	$scope.initializeCalculator($scope.calc);
}]);

function mode(numbers) {
	console.log(numbers == null);
	let modes = math.mode(numbers);
	
	// Find out how many times the 'first' mode appears in the list of numbers
	let count = 0;
	let number = modes[0].d[0];

	for (let i = 0; i < numbers.length; i++) {
		if (numbers[i] == number) {
			count++;
		}
	}

	return modes  + ' (' + count + ' times)';
}

function range(numbers) {
	let smallest = numbers[0];
	let largest = numbers[numbers.length - 1];

	if (smallest === undefined || largest === undefined) {
		return 'n/a';
	}

	return largest - smallest;
}
