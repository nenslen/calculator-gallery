angular.module('calculatorApp', []).controller('app-controller', ['$scope', function($scope) {
	$scope.colorThemeNames = [
		'default',
		//'blue',
		'red',
		//'white',
		//'dark-grey',
		//'dark-red',
		//'dark-blue',
		//'green',
		'purple'
		//'yellow',
		//'orange'
	];
	
	$scope.colorThemes = {
		default: new ColorTheme('default'),
		red: new ColorTheme('red', 'red', 'red', 'red'),
		purple: new ColorTheme('purple', 'purple', 'purple', 'purple'),
	}

	$scope.changeColorTheme = function(names) {
		console.log($scope);
		console.log(names);
		names = new ColorTheme()
	}
}]);

function cleanArray(array) {
	array = array.filter(i=>i!='');
	return array;
}
