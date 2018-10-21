let express = require('express');
let app = express();
let server = require('http').Server(app);
let ejs = require('ejs');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const allCalculators = [
	'square',
	'distance',
];

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/media', express.static(__dirname + '/media'));
app.use('/html', express.static(__dirname + '/html'));


app.get('/', function(req, res) {
	let settings = {
		square: {
			colorTheme: {
				backgroundColor: "red",
				id: "red",
				inputColor: "red",
				name: "Red",
				outputColor: "red"
			},
			decimalPlaces: 3
		},
		distance: {
			colorTheme: {
				backgroundColor: "blue",
				id: "blue",
				inputColor: "blue",
				name: "Blue",
				outputColor: "blue"
			}
		}
	};
	res.cookie('calculatorSettings', settings);

    res.render('index', {
    	calculators: allCalculators,
    	favorites: getFavorites(req),
    	calculatorSettings: getCalculatorSettings(req)
    }); 
});


app.get('/favorites', function(req, res) {
	res.render('favorites', {
		calculators: getFavorites(req),
		calculatorSettings: getCalculatorSettings(req)
	});
});


app.post('/favorites/add', function(req, res) {
	let calcName = req.body.calcName;
	let favorites = getFavorites(req);

	saveFavorite(calcName, favorites, res);

	res.send(generateResponse(true, 'Calculator added to favorites!'));
});


app.post('/favorites/remove', function(req, res) {
	let calcName = req.body.calcName;
	let favorites = getFavorites(req);

	removeFavorite(calcName, favorites, res);	

	res.send(generateResponse(true, 'Calculator removed from favorites!'));
});


server.listen(8081, function() {
    console.log('Listening on ' + server.address().port);
});


/**
 * Gets all of the settings for the calculators in calculatorNames
 *
 * @param req: The request object
 * @return: An array of settings for the desired calculators
 */
function getCalculatorSettings(req) {
	return req.cookies.calculatorSettings || [];
}

/**
 * Gets all of the user's favorited calculators from a cookie.
 *
 * @param req: The request object
 * @return: An array of strings representing the user's favorites (empty if user has no favorites)
 */
function getFavorites(req) {
	return req.cookies.favorites || [];
}

/**
 * Saves a calculator to the user's favorites cookie. If the favorites cookie doesn't exist yet, it
 * will be created, and initialized with the new favorite. This function also ensures that a 
 * favorite is only added once to the favorites cookie.
 *
 * @param calculator: The name of the calculator a user wants to favorite
 * @param favorites: The user's current favorites (stored in a cookie)
 * @param res: The response object
 */
function saveFavorite(calculator, favorites, res) {
	if(favorites != undefined) {
		if (!favorites.includes(calculator)) {
			favorites.push(calculator);
			res.cookie('favorites', favorites);
		}
	} else {
		res.cookie('favorites', [calculator]);
	}
}

/**
 * Removes a calculator from the user's favorites cookie. If the favorites cookie doesn't exist, no 
 * action will be taken.
 * 
 * @param calculator: The name of the calculator a user wants to favorite
 * @param favorites: The user's current favorites (stored in a cookie)
 * @param res: The response object
 */
function removeFavorite(calculator, favorites, res) {
	if(favorites != undefined) {
		let index = favorites.indexOf(calculator);
		
		if (index !== -1) {
			favorites.splice(index, 1);
		}

		res.cookie('favorites', favorites);
	}
}

function generateResponse(success, message) {
	return JSON.stringify({
		success: success,
		message: message
	});
}
