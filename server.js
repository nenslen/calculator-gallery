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
	'distance'
];

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/media', express.static(__dirname + '/media'));
app.use('/html', express.static(__dirname + '/html'));


app.get('/', function(req, res) {
	let favorites = getFavorites(req);

    res.render('index', {
    	calculators: allCalculators,
    	favorites: favorites
    }); 
});


app.get('/favorites', function(req, res) {
	let favorites = getFavorites(req);
	res.render('favorites', { favorites: favorites });
});


app.post('/favorites/add', function(req, res) {
	let calculator = req.body.calculator;
	let favorites = getFavorites(req);

	saveFavorite(calculator, favorites, res);	

	res.redirect('/');
});


app.post('/favorites/delete', function(req, res) {
	let calculator = req.body.calculator;
	let favorites = getFavorites(req);

	removeFavorite(calculator, favorites, res);	

	res.redirect('/');
});


server.listen(8081, function() {
    console.log('Listening on ' + server.address().port);
});


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
