angular.module('calculatorApp', []).controller('app-controller', ['$scope', function($scope) {
	
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
		yellow: new ColorTheme('yellow', 'yellow', 'yellow', 'yellow'),

	};

	$scope.colorThemeNames = [];
	for (let key in $scope.colorThemes) {
		$scope.colorThemeNames.push(key);
	}

	$scope.decimalPlacesOptions = ['auto', 0, 1, 2, 3, 4, 5, 6, 7 , 8, 9];


	/**
	 * This array is populated by each calculator when it is loaded. For example, if the
	 * distance calculator is loaded on the page, distance.js creates the distance calculator and
	 * adds it to this array, accessible by $scope.calculators['distance']
	 */
	$scope.calculators = [];
	$scope.currentCalc = 0;

	$scope.openSettings = function(calcName) {
		let modal = document.getElementById('settings-modal');
		modal.style.display = 'block';
console.log(calcName);
		$scope.currentCalc = $scope.calculators[calcName];
	}

	$scope.changeColorTheme = function(colorThemeName) {
		$scope.currentCalc.colorTheme = $scope.colorThemes[colorThemeName];
	};

	$scope.changeDecimalPlaces = function(decimalPlaces) {
		/*
		if(decimalPlaces === 'auto') {
			currentCalc.decimalPlaces = decimalPlaces;
		} else {
			currentCalc.decimalPlaces = parseInt(decimalPlaces);
		}
		*/
		$scope.currentCalc.decimalPlaces = decimalPlaces;
		$scope.currentCalc.calculate();
	};

	// Close modal
	window.onclick = function(event) {
		let modal = document.getElementById('settings-modal');
		let modalInner = document.getElementsByClassName('modal-inner')[0];
		let exitIcon = document.getElementsByClassName('exit-icon')[0];

	    if (event.target == modal || event.target == exitIcon || event.target == modalInner) {
	        modal.style.display = 'none';
	        $scope.currentCalc = 0;
	    }
	}
}]);

function cleanArray(array) {
	array = array.filter(i=>i!='');
	return array;
}
