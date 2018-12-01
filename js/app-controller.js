angular.module('calculatorApp', ['ngCookies']).controller('app-controller', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {
	let EXPIRATION = {'expires': new Date(2038, 1, 1)};

	// (id, name, input, output, background)
	$scope.colorThemes = {
		default: new ColorTheme('default', 'Default'),
		red: new ColorTheme('red', 'Red', 'red', 'red', 'red'),
		blue: new ColorTheme('blue', 'Blue', 'blue', 'blue', 'blue'),
		purple: new ColorTheme('purple', 'Purple', 'purple', 'purple', 'purple'),
		canada: new ColorTheme('canada', 'Canada', 'red', 'red', 'default'),
		dark: new ColorTheme('dark', 'Dark', 'dark-grey', 'dark-grey', 'dark-grey'),
		darkRed: new ColorTheme('darkRed', 'Dark Red', 'dark-red', 'dark-red', 'dark-red'),
		darkBlue: new ColorTheme('darkBlue', 'Dark Blue', 'dark-blue', 'dark-blue', 'dark-blue'),
		juicy: new ColorTheme('juicy', 'Juicy', 'red', 'red', 'blue'),
		yellow: new ColorTheme('yellow', 'Yellow', 'yellow', 'yellow', 'yellow'),
		halloween: new ColorTheme('halloween', 'Halloween', 'orange', 'dark-grey', 'dark-grey'),
		highContrast: new ColorTheme('highContrast', 'High Contrast', 'dark-grey', 'dark-grey', 'default'),
		christmas: new ColorTheme('christmas', 'Christmas', 'red', 'red', 'green'),
		magenta: new ColorTheme('magenta', 'Magenta', 'magenta', 'magenta', 'magenta'),
	};

	$scope.decimalPlacesOptions = ['Auto', 'Max', 1, 2, 3, 4, 5, 6, 7, 8, 9];
	$scope.calculators = [];
	$scope.currentCalc = 0;
	$scope.searchTerm = '';

	/**
	 * Adds a calculator to the 'calculators' array and applies any custom settings (found in the
	 * settings cookie) to the calculator
	 *
	 * @param calculator: The calculator to initialize
	 */
	$scope.initializeCalculator = function(calculator) {
		let calcName = calculator.name;
		let settings = $scope.getSettings();

		if (settings !== undefined) {
			settings = settings[calcName];
		}

		for (let setting in settings) {
			calculator[setting] = settings[setting];
		}

		$scope.calculators[calcName] = calculator;
	};

	$scope.filterCalculators = function() {
		let searchMessage = document.getElementById('search-message');
		let calculators = document.getElementsByClassName('calc-outer');
		let calculatorCount = 0;

		for (let i = 0; i < calculators.length; i++) {
			let calculator = calculators[i];
			let found = calculator.innerHTML.toLowerCase().indexOf($scope.searchTerm.toLowerCase());
			
			if (found === -1) {
				calculator.style.display = "none";
			} else {
				calculator.style.display = "block";
				calculatorCount++;
			}
		}

		if (calculatorCount <= 0) {
			searchMessage.innerHTML = 'Sorry! No calculators found :(';
		} else {
			searchMessage.innerHTML = ' ';
		}
	};

	$scope.openSettings = function(calcName) {
		let modal = document.getElementById('settings-modal');

		modal.style.display = 'block';
		$scope.setCurrentCalc(calcName);
	};

	$scope.openInfo = function(calcName) {
		let modal = document.getElementById('info-modal');
		let modalBody = document.getElementById('info-modal-body');
		
		modal.style.display = 'block';
		$scope.setCurrentCalc(calcName);

		// Clone the calculator's info section and insert into modal
		let calcInfoElement = document.getElementById(calcName + '-info').cloneNode(true);
		calcInfoElement.setAttribute('ng-hide', 'false');
		calcInfoElement.setAttribute('class', '');
		modalBody.innerHTML = calcInfoElement.innerHTML;
	};

	/**
	 * Tells the server to favorite/unfavorite a calculator based on its current favorited status.
	 * This method also updates the UI to reflect the new favorited status. (no I probably shouldn't
	 * be updating the DOM from within a controller, oh well!)
	 */
	$scope.toggleFavoriteStatus = function(calcName) {
		let favorited = $scope.calculatorIsFavorited(calcName);
		
		// Toggle the favorited status
		favorited = !favorited;

		let calcTopElement = document.querySelector('#' + calcName + '-calculator .calc-top');
		let starIconElement = calcTopElement.querySelector('#favorite-icon i');

		starIconElement.classList.remove('fas');
        starIconElement.classList.remove('far');

		if (favorited) {
			starIconElement.classList.add('fas');
			$scope.addCalcToFavorites(calcName);
		} else {
			starIconElement.classList.add('far');
			$scope.removeCalcFromFavorites(calcName);
		}
	};

	/**
	 * Returns the favorites cookie as an array of calculator names if it exists, and
	 * null otherwise
	 */
	$scope.getFavorites = function() {
		let favorites = $cookies.get('favorites');

		if (favorites) {
			return favorites.split(',');
		} else {
			return null;
		}
	};

	$scope.calculatorIsFavorited = function(calculator) {
		let favorites = $scope.getFavorites();

		if (favorites) {
			return favorites.includes(calculator);
		} else {
			return false;
		}
	};

	$scope.addCalcToFavorites = function(calculator) {
		let favorites = $scope.getFavorites();

		if (favorites) {
			if (!favorites.includes(calculator)) {
				favorites.push(calculator);
			}	
		} else {
			favorites = calculator;
		}

		$cookies.put('favorites', favorites, EXPIRATION);
		console.log($scope.getFavorites());
	};

	$scope.removeCalcFromFavorites = function(calculator) {
		let favorites = $scope.getFavorites();

		if (favorites) {
			let index = favorites.indexOf(calculator);
			
			if (index !== -1) {
				favorites.splice(index, 1);
			}	
		}

		$cookies.put('favorites', favorites, EXPIRATION);
		console.log($scope.getFavorites());
	};

	$scope.getSettings = function() {
		return $cookies.getObject('settings');
	};

	$scope.saveSetting = function(setting, value) {
		let settings = $scope.getSettings();
		let calculator = $scope.currentCalc.name;

		if (!settings) {
			settings = {};
		}
		
		if (!settings[calculator]) {
			settings[calculator] = {};
		}

		settings[calculator][setting] = value;
		$cookies.putObject('settings', settings, EXPIRATION);
	};

	$scope.changeColorTheme = function(newColorTheme) {
		$scope.currentCalc.colorTheme = newColorTheme;
		$scope.saveSetting('colorTheme', newColorTheme);
	};

	$scope.changeDecimalPlaces = function(decimalPlaces) {
		$scope.currentCalc.decimalPlaces = decimalPlaces;
		$scope.currentCalc.calculate();
		$scope.saveSetting('decimalPlaces', decimalPlaces);
	};

	$scope.setCurrentCalc = function(calcName) {
		$scope.currentCalc = $scope.calculators[calcName];
	};

	$scope.copyOutput = function($event) {
		let output = $event.currentTarget;
		output.select();
		document.execCommand('copy');
		//output.selectionStart = output.selectionEnd;
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
	};

	window.onload = function() {
		document.getElementById('search-input').focus();
	};
}]);

function cleanArray(array) {
	array = array.filter(i => i != '');
	return array;
}
