angular.module('calculatorApp', []).controller('app-controller', ['$scope', function($scope) {
	
	// (name, input, output, background)
	$scope.colorThemes = {
		default: new ColorTheme('default'),
		red: new ColorTheme('red', 'red', 'red', 'red'),
		blue: new ColorTheme('blue', 'blue', 'blue', 'blue'),
		purple: new ColorTheme('purple', 'purple', 'purple', 'purple'),
		canada: new ColorTheme('canada', 'red', 'red', 'default'),
		dark: new ColorTheme('dark', 'dark-grey', 'dark-grey', 'dark-grey'),
		darkRed: new ColorTheme('darkRed', 'dark-red', 'dark-red', 'dark-red'),
		darkBlue: new ColorTheme('darkBlue', 'dark-blue', 'dark-blue', 'dark-blue'),
		juicy: new ColorTheme('juicy', 'red', 'red', 'blue'),
		yellow: new ColorTheme('yellow', 'yellow', 'yellow', 'yellow'),
		halloween: new ColorTheme('halloween', 'orange', 'dark-grey', 'dark-grey'),
		highContrast: new ColorTheme('highContrast', 'dark-grey', 'dark-grey', 'default'),
		christmas: new ColorTheme('christmas', 'red', 'red', 'green'),
		magenta: new ColorTheme('magenta', 'magenta', 'magenta', 'magenta'),
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
	$scope.currentColorTheme = '';
	$scope.currentCalc = 0;

	$scope.openSettings = function(calcName) {
		let modal = document.getElementById('settings-modal');
		modal.style.display = 'block';

		$scope.currentCalc = $scope.calculators[calcName];
		$scope.currentColorTheme = $scope.currentCalc.colorTheme.name;
	}

	$scope.openInfo = function(calcName) {
		let modal = document.getElementById('info-modal');
		modal.style.display = 'block';

		$scope.currentCalc = $scope.calculators[calcName];
		$scope.currentColorTheme = $scope.currentCalc.colorTheme.name;
	}

	$scope.changeColorTheme = function(colorThemeName) {
		$scope.currentCalc.colorTheme = $scope.colorThemes[colorThemeName];
	};

	$scope.changeDecimalPlaces = function(decimalPlaces) {
		$scope.currentCalc.decimalPlaces = decimalPlaces;
		$scope.currentCalc.calculate();
	};

	// Close modal
	window.onclick = function(event) {
		let modals = [
			document.getElementById('settings-modal'),
			document.getElementById('info-modal'),
		];
		let modalInners = document.getElementsByClassName('modal-inner');
		let exitIcons = document.getElementsByClassName('exit-icon');

		for (let i = 0; i < modals.length; i++) {
			if (event.target == modals[i] || event.target == exitIcons[i] || event.target == modalInners[i]) {
		        modals[i].style.display = 'none';
		        $scope.currentCalc = 0;
		    }	
		}
	}
}]);

function cleanArray(array) {
	array = array.filter(i=>i!='');
	return array;
}
