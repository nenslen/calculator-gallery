angular.module('calculatorApp', []).controller('app-controller', ['$scope', function($scope) {
	$scope.colorThemeNames = [
		'default',
		//'blue',
		'red',
		'blue',
		//'white',
		//'green',
		'purple',
		'yellow',
		//'orange',
		'america',
		'dark',
		'darkRed',
		'darkBlue',
		'juicy'
	];
	
	$scope.colorThemes = {
		default: new ColorTheme('default'),
		red: new ColorTheme('red', 'red', 'red', 'red'),
		blue: new ColorTheme('blue', 'blue', 'blue', 'blue'),
		purple: new ColorTheme('purple', 'purple', 'purple', 'purple'),
		america: new ColorTheme('america', 'blue', 'default', 'red'),
		dark: new ColorTheme('dark', 'dark-grey', 'dark-grey', 'dark-grey'),
		darkRed: new ColorTheme('darkRed', 'dark-red', 'dark-red', 'dark-red'),
		darkBlue: new ColorTheme('darkBlue', 'dark-blue', 'dark-blue', 'dark-blue'),
		juicy: new ColorTheme('juicy', 'red', 'red', 'blue'),
		yellow: new ColorTheme('yellow', 'yellow', 'yellow', 'yellow')
	};

	$scope.decimalPlacesOptions = [
		'auto',
		'0',
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9'
	];

	/**
	 * This array is populated by each calculator when it is loaded. For example, if the
	 * distance calculator is loaded on the page, distance.js creates the distance calculator and
	 * adds it to this array, accessible by $scope.calculators['distance']
	 */
	$scope.calculators = [];
	$scope.currentCalcName = '';
	$scope.currentCalcColorTheme = '';
	$scope.currentCalcDecimalPlaces = 'auto';

	$scope.openSettings = function(calcName) {
		let modal = document.getElementById('settings-modal');
		modal.style.display = 'block';

		let calc = $scope.calculators[calcName];
		$scope.currentCalcName = calcName;
		$scope.currentCalcColorTheme = calc.colorTheme.name;
		$scope.currentCalcDecimalPlaces = calc.decimalPlaces;
	}

	$scope.changeColorTheme = function(colorThemeName) {
		let calcName = $scope.currentCalcName;
		let calc = $scope.calculators[calcName];

		calc.colorTheme = $scope.colorThemes[colorThemeName];
	};

	$scope.changeDecimalPlaces = function(places) {
		let calcName = $scope.currentCalcName;
		let calc = $scope.calculators[calcName];

		if(places === 'auto') {
			calc.decimalPlaces = places;
		} else {
			calc.decimalPlaces = parseInt(places);
		}
		
		calc.calculate();
	};

	// Close modal
	window.onclick = function(event) {
		let modal = document.getElementById('settings-modal');

	    if (event.target == modal) {
	        modal.style.display = 'none';
	        $scope.currentCalcName = '';
	        $scope.currentCalcColorTheme = '';
	    }
	}
}]);

function cleanArray(array) {
	array = array.filter(i=>i!='');
	return array;
}
