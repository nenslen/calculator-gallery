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
		    	return parseFloat(number);
			})
			.sort(function(a, b) {
				return a - b;
			});

		this.outputs.mean.value = mean(numbers);
		this.outputs.median.value = median(numbers);
		this.outputs.mode.value = mode(numbers);
		this.outputs.range.value = range(numbers);

		this.errors = [];
		this.truncateOutputs();
	};

	$scope.calc = new Calculator(title, name, description, inputs, outputs, calculate);
	$scope.initializeCalculator($scope.calc);
}]);

function mean(numbers) {
	let count = numbers.length;
	let sum = 0;
	let mean = 0;

	if (count > 0) {
		sum = numbers.reduce(function(total, number) {
		    return total + number;
		});
		mean = sum / count;
	}

	return mean;
}

function median(numbers) {
	let count = numbers.length;
	let middleIndex = Math.floor(numbers.length / 2);
	let median = 0;
	
	if (count > 0) {
		if (count % 2 === 1) {
			median = numbers[middleIndex];
		} else {
			median = (numbers[middleIndex - 1] + numbers[middleIndex]) / 2.0;
		}
	}

	return median;
}

function mode(numbers) {
	let counts = [];

	// Count how many times each number appears
	for (let i = 0; i < numbers.length; i++) {
		let number = numbers[i];

		if (counts[number] !== undefined) {
			counts[number]++;
		} else {
			counts[number] = 1;
		}
	}

	// Find the number with the highest count
	let highestCount = 0;
	let mode = 'n/a';

	for (let number in counts) {
		if (counts[number] > highestCount) {
			highestCount = counts[number];
			mode = number;
		}
	}

	if (highestCount <= 1) {
		return 'n/a';
	}
	
	return mode + ' (' + highestCount + ' times)';
}

function range(numbers) {
	let smallest = numbers[0];
	let largest = numbers[numbers.length - 1];

	if (smallest === undefined || largest === undefined) {
		return 'n/a';
	}

	return largest - smallest;
}
