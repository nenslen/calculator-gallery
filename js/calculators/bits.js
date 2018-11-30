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
		//exabytes: new Output('Exabytes (EB)', 0, 'number'),
		bits: new Output('Bits (b)', 0, 'number'),
		nibbles: new Output('Nibbles', 0, 'number'),
		kilobits: new Output('Kilobits (kb)', 0, 'number'),
		megabits: new Output('Megabits (Mb)', 0, 'number'),
		gigabits: new Output('Gigabits (Gb)', 0, 'number'),
		terabits: new Output('Terabits (Tb)', 0, 'number'),
		petabits: new Output('Petabits (Pb)', 0, 'number'),
		//exabits: new Output('Exabits (Eb)', 0, 'number'),
	};

	$scope.units = {
		bytes:     new Unit('bytes',     'Bytes (B)',      8,                   8),
		kilobytes: new Unit('kilobytes', 'Kilobytes (kB)', 8000,                8192),
		megabytes: new Unit('megabytes', 'Megabytes (MB)', 8000000,             8388608),
		gigabytes: new Unit('gigabytes', 'Gigabytes (GB)', 8000000000,          8589934592),
		terabytes: new Unit('terabytes', 'Terabytes (TB)', 8000000000000,       8796093022208),
		petabytes: new Unit('petabytes', 'Petabytes (PB)', 8000000000000000,    9007199254740992),
		//exabytes:  new Unit('exabytes',  'Exabytes (EB)',  8000000000000000000, 9223372036854775808),
		bits:      new Unit('bits',      'Bits (b)',       1,                   1),
		nibbles:   new Unit('nibbles',   'Nibbles',        4,                   4),
		kilobits:  new Unit('kilobits',  'Kilobits (kb)',  1000,                1024),
		megabits:  new Unit('megabits',  'Megabits (Mb)',  1000000,             1048576),
		gigabits:  new Unit('gigabits',  'Gigabits (Gb)',  1000000000,          1073741824),
		terabits:  new Unit('terabits',  'Terabits (Tb)',  1000000000000,       1099511627776),
		petabits:  new Unit('petabits',  'Petabits (Pb)',  1000000000000000,    1125899906842624),
		//exabits:   new Unit('exabits',   'Exabits (Eb)',   1000000000000000000, 1152921504606846976),
	};
	$scope.unit = new Unit('bytes', 'Bytes (B)', 8, 8);
    
    $scope.bases = [
        'Binary (kilobyte = 1024 bytes)',
        'Decimal (kilobyte = 1000 bytes)',
    ];
    $scope.base = 'Binary (kilobyte = 1024 bytes)';

	let calculate = function() {
        bitEquivalent = 0;

        if ($scope.base === 'Binary (kilobyte = 1024 bytes)') {
            bitEquivalent = math.bignumber($scope.unit.binary);
        } else {
            bitEquivalent = math.bignumber($scope.unit.decimal);
        }

        let value = 0;
        try {
            value = math.bignumber(this.inputs.inputValue.value);
        } catch (error) {
            this.resetOutputs();

            if (this.inputs.inputValue.value.length !== 0) {    
                this.errors = [];
                this.errors.push(error);
                return;
            }
        }
        let totalBits = math.multiply(value, bitEquivalent);

		for (let key in this.outputs) {
			let bits = 0;

            if ($scope.base === 'Binary (kilobyte = 1024 bytes)') {
                bits = math.bignumber($scope.units[key].binary);
            } else {
                bits = math.bignumber($scope.units[key].decimal);
            }

			bits = math.divide(totalBits, bits);

			this.outputs[key].value = bits;
		}
		
		this.errors = [];
		this.truncateOutputs();
	};

	$scope.calc = new Calculator(title, name, description, inputs, outputs, calculate);
	$scope.initializeCalculator($scope.calc);
}]);


function Unit(id, name, decimal, binary) {
	this.id = id;
	this.name = name;

	// How many bits this unit has in decimal
	this.decimal = decimal;

	// How many bits this unit has in binary
	this.binary = binary;
}
