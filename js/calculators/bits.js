angular.module('calculatorApp').controller('bits', ['$scope', function($scope) {
	let title = 'Bit conversion';
	let name = 'bits';
	let description = ['Convert between bits, bytes, kilobits, kilobytes, etc.'];
	
	let inputs = {
		inputValue: new Input('inputValue', '', ''),
		inputType: new Input('inputType', '', ''),
		base: new Input('base', '', '')
	};
	
	let outputs = {
		bytes: new Output('Bytes (B)', 0, 'number'),
		kilobytes: new Output('Kilobytes (kB)', 0, 'number'),
		megabytes: new Output('Megabytes (MB)', 0, 'number'),
		gigabytes: new Output('Gigabytes (GB)', 0, 'number'),
		terabytes: new Output('Terabytes (TB)', 0, 'number'),
		petabytes: new Output('Petabytes (PB)', 0, 'number'),
		extabytes: new Output('Exabytes (EB)', 0, 'number'),
		zettabytes: new Output('Zettabytes (ZB)', 0, 'number'),
		yottabytes: new Output('Yottabytes (YB)', 0, 'number'),
		bits: new Output('Bits (b)', 0, 'number'),
		nibbles: new Output('Nibbles', 0, 'number'),
		kilobits: new Output('Kilobits (kb)', 0, 'number'),
		megabits: new Output('Megabits (Mb)', 0, 'number'),
		gigabits: new Output('Gigabits (Gb)', 0, 'number'),
		terabits: new Output('Terabits (Tb)', 0, 'number'),
		petabits: new Output('Petabits (Pb)', 0, 'number'),
		extabits: new Output('Exabits (Eb)', 0, 'number'),
		zettabits: new Output('Zettabits (Zb)', 0, 'number'),
		yottabits: new Output('Yottabits (Yb)', 0, 'number'),
	};

	$scope.conversionOptions = {
		bytes: new ConversionOption('bytes', 'Bytes (B)', 8),
		kilobytes: new ConversionOption('kilobytes', 'Kilobytes (kB)', 8000),
		megabytes: new ConversionOption('megabytes', 'Megabytes (MB)', 8000000),
		gigabytes: new ConversionOption('gigabytes', 'Gigabytes (GB)', 15),
		terabytes: new ConversionOption('terabytes', 'Terabytes (TB)', 15),
		petabytes: new ConversionOption('petabytes', 'Petabytes (PB)', 15),
		extabytes: new ConversionOption('extabytes', 'Exabytes (EB)', 15),
		zettabytes: new ConversionOption('zettabytes', 'Zettabytes (ZB)', 15),
		yottabytes: new ConversionOption('yottabytes', 'Yottabytes (YB)', 15),
		bits: new ConversionOption('bits', 'Bits (b)', 1),
		nibbles: new ConversionOption('nibbles', 'Nibbles', 15),
		kilobits: new ConversionOption('kilobits', 'Kilobits (kb)', 15),
		megabits: new ConversionOption('megabits', 'Megabits (Mb)', 15),
		gigabits: new ConversionOption('gigabits', 'Gigabits (Gb)', 15),
		terabits: new ConversionOption('terabits', 'Terabits (Tb)', 15),
		petabits: new ConversionOption('petabits', 'Petabits (Pb)', 15),
		extabits: new ConversionOption('extabits', 'Exabits (Eb)', 15),
		zettabits: new ConversionOption('zettabits', 'Zettabits (Zb)', 15),
		yottabits: new ConversionOption('yottabits', 'Yottabits (Yb)', 15),
	};
	$scope.conversionOption = new ConversionOption('bytes', 'Bytes (B)', 8);

	let calculate = function() {
		let value = parseInt(this.inputs.inputValue.value);
		let bitEquivalent = parseInt($scope.conversionOption.bits);
		let totalBits = value * bitEquivalent;

		for (let key in this.outputs) {
			let bits = $scope.conversionOptions[key].bits;
			this.outputs[key].value = totalBits / bits;
		}
		
		this.errors = [];
		this.truncateOutputs();
	};

	$scope.calc = new Calculator(title, name, description, inputs, outputs, calculate);
	$scope.initializeCalculator($scope.calc);
}]);

function ConversionOption(id, name, bits) {
	this.id = id;
	this.name = name;
	this.bits = bits;
}
