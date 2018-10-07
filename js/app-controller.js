angular.module('calculatorApp', []).controller('app-controller', ['$scope', function($scope) {
	$scope.colorThemeNames = [
		'default',
		//'blue',
		'red',
		'blue',
		//'white',
		//'green',
		'purple',
		//'yellow',
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
		juicy: new ColorTheme('juicy', 'red', 'red', 'blue')
	}
}]);

function cleanArray(array) {
	array = array.filter(i=>i!='');
	return array;
}
