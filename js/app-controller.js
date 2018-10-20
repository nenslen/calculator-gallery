angular.module('calculatorApp', []).controller('app-controller', ['$scope', '$http', function($scope, $http) {
	
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
	 * This array is populated by each calculator when they are loaded. For example, if the
	 * distance calculator is loaded on the page, the distance.js controller creates the distance
	 * calculator and adds it to this array, accessible by $scope.calculators['distance']
	 */
	$scope.calculators = [];
	$scope.currentColorTheme = '';
	$scope.currentCalc = 0;

	$scope.openSettings = function(calcName) {
		let modal = document.getElementById('settings-modal');
		modal.style.display = 'block';

		$scope.setCurrentCalc(calcName);
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

	$scope.changeColorTheme = function(colorThemeName) {
		$scope.currentCalc.colorTheme = $scope.colorThemes[colorThemeName];
	};

	$scope.changeDecimalPlaces = function(decimalPlaces) {
		$scope.currentCalc.decimalPlaces = decimalPlaces;
		$scope.currentCalc.calculate();
	};

	$scope.setCurrentCalc = function(calcName) {
		$scope.currentCalc = $scope.calculators[calcName];
		$scope.currentColorTheme = $scope.currentCalc.colorTheme.name;
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
