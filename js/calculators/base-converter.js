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
	
	let baseNumbers = {
		bin: 2,
		dec: 10,
		hex: 16,
	};

	let calculate = function(inputBase) {
		if (!inputBase) {
			return;
		}

		let inputValue = inputs[inputBase].value;
		let inputBaseNumber = baseNumbers[inputBase];
		
		for (let base in this.inputs) {
			if (inputBase == base) { continue; }

			let baseNumber = baseNumbers[base];
			try {
				this.inputs[base].value = convertBase(inputValue.toLowerCase(), inputBaseNumber, baseNumber);
			} catch(error) {
				this.errors.push(error);
				return;
			}
		}

		this.errors = [];
		this.truncateOutputs();
	};

	$scope.calc = new Calculator(title, name, description, inputs, outputs, calculate);
	$scope.initializeCalculator($scope.calc);
}]);

function convertBase(value, from_base, to_base) {
	var range = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'.split('');
	var from_range = range.slice(0, from_base);
	var to_range = range.slice(0, to_base);

	var dec_value = value.split('').reverse().reduce(function (carry, digit, index) {
	if (from_range.indexOf(digit) === -1) throw new Error('Invalid digit `'+digit+'` for base '+from_base+'.');
		return carry += from_range.indexOf(digit) * (Math.pow(from_base, index));
	}, 0);

	var new_value = '';
	while (dec_value > 0) {
		new_value = to_range[dec_value % to_base] + new_value;
		dec_value = (dec_value - (dec_value % to_base)) / to_base;
	}
	return new_value || '0';
}
