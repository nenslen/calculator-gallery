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
		mode: new Output('Mode', 0, 'number'),
		range: new Output('Range', 0, 'number'),
	};
	
	let calculate = function() {
		let numbers = this.inputs.numbers.value.split(',');
		numbers = cleanArray(numbers);
		numbers = numbers
			.map(function(number) {
		    	return parseFloat(number);
			})
			.sort(function(a, b) {
				return a - b;
			});
		
		let count = numbers.length;
		let sum = 0;
		let mean = 0;
		if (count > 0) {
			sum = numbers.reduce(function(total, number) {
			    return total + number;
			});
			mean = sum / count;
		}
		
		let middleIndex = Math.floor(numbers.length / 2);
		let median = 0;
		if (count % 2 === 1) {
			median = numbers[middleIndex];
		} else {
			median = (numbers[middleIndex - 1] + numbers[middleIndex]) / 2.0;
		}

		this.outputs.mean.value = mean;
		this.outputs.median.value = median;
		this.errors = [];
		this.truncateOutputs();
	};

	$scope.calc = new Calculator(title, name, description, inputs, outputs, calculate);
	$scope.initializeCalculator($scope.calc);
}]);
