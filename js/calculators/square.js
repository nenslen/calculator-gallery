angular.module('calculatorApp').controller('square', ['$scope', function($scope) {
	let title = 'Square';
	let name = 'square';
	let description = ['This calculator takes a number, and returns its square.'];
	let inputs = {
		x: new Input('X', 0)
	};
	let outputs = {
		y: new Output('Y', 0)
	};
	let colorTheme = $scope.colorThemes.dark;

	$scope.calc = new Calculator(title, name, description, inputs, outputs, colorTheme);

	$scope.calculate = function() {
		let x = $scope.calc.inputs.x.value;
		$scope.calc.outputs.y.value = x * x;

		if(x === 5) {
			$scope.calc.errors = ['X cannot be 5'];
		} else {
			$scope.calc.errors = [];
		}
	};

	$scope.changeColorTheme = function(colorTheme)  {
		$scope.calc.colorTheme = colorTheme;
	};
}]);
