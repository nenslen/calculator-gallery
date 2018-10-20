angular.module('calculatorApp', []).controller('app-controller', ['$scope', '$http', function($scope, $http) {
	
	// (name, input, output, background)
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

	$scope.colorThemeOptions = [];
	for (let key in $scope.colorThemes) {
		let newTheme = {
			'value': key,
			'text': $scope.colorThemes[key].name
		};
		$scope.colorThemeOptions.push(newTheme);
	}

	$scope.decimalPlacesOptions = ['auto', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];


	/**
	 * This array is populated by each calculator when they are loaded. For example, if the
	 * distance calculator is loaded on the page, the distance.js controller creates the distance
	 * calculator and adds it to this array, accessible by $scope.calculators['distance']
	 */
	$scope.calculators = [];
	$scope.currentColorTheme = '';
	$scope.currentCalc = 0;

	$scope.openSettings = function(calcName) {
		let modal = document.getElementById('settings-modal');
		$scope.setCurrentCalc(calcName);
		modal.style.display = 'block';

		// Initialize selected item in color theme dropdown
		let key = $scope.currentColorTheme.value;
		$scope.currentColorTheme = {
			'value': $scope.currentCalc.colorTheme.id,
			'text': $scope.currentCalc.colorTheme.name
		};
	}

	$scope.openInfo = function(calcName) {
		let modal = document.getElementById('info-modal');
		let modalBody = document.getElementById('info-modal-body');
		modal.style.display = 'block';

		// Clone the calculator's info section and insert into modal
		let calcInfoElement = document.getElementById(calcName + '-info').cloneNode(true);
		calcInfoElement.setAttribute('ng-hide', 'false');
		calcInfoElement.setAttribute('class', '');
		modalBody.innerHTML = calcInfoElement.innerHTML;

		$scope.setCurrentCalc(calcName);
	}

	/**
	 * Tells the server to favorite/unfavorite a calculator based on its current favorited status.
	 * This method also updates the UI to reflect the new favorited status. (no I probably shouldn't
	 * be updating the DOM from within a controller, oh well!)
	 */
	$scope.toggleFavoriteStatus = function(calcName) {
		let calcTopElement = document.querySelector('#' + calcName + '-calculator .calc-top');
		let starIconElement = calcTopElement.querySelector('#favorite-icon i');
		
		let favorited = starIconElement.getAttribute('data-favorited') === 'true';
		let url = (favorited) ? '/favorites/remove' : '/favorites/add';
		let params = { calcName: calcName };

		$http({
            url: url,
            method: "POST",
            data: params
        })
        .then(function (data) {
            if(data.data.success) {
            	console.log(data.data.message);
            	starIconElement.classList.remove('fas');
            	starIconElement.classList.remove('far');

            	// If favorited is true, then we just unfavorited a calc, so set its favorited status to false
            	if(favorited) {
            		starIconElement.classList.add('far');
            		starIconElement.setAttribute('data-favorited', 'false');
            	} else {
            		starIconElement.classList.add('fas');
            		starIconElement.setAttribute('data-favorited', 'true');
            	}
            }
        });
	}

	$scope.changeColorTheme = function(newColorTheme) {
		$scope.currentCalc.colorTheme = $scope.colorThemes[newColorTheme.value];
		console.log($scope.currentCalc.colorTheme);
		console.log($scope.currentColorTheme);
	};

	$scope.changeDecimalPlaces = function(decimalPlaces) {
		$scope.currentCalc.decimalPlaces = decimalPlaces;
		$scope.currentCalc.calculate();
	};

	$scope.setCurrentCalc = function(calcName) {
		$scope.currentCalc = $scope.calculators[calcName];
		$scope.currentColorTheme = $scope.currentCalc.colorTheme;
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
