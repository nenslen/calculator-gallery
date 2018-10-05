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

let allCalculators = [
	'square',
	'distance'
];

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/media', express.static(__dirname + '/media'));
app.use('/html', express.static(__dirname + '/html'));


app.get('/', function(req, res) {
	res.clearCookie('favorites');
	//console.log(req.cookies);
	let favorites = getFavorites(req);

    res.render('index', {
    	allCalculators: allCalculators,
    	favorites: favorites
    }); 
});


app.get('/favorites', function(req, res) {
	let favorites = getFavorites(req);
	res.render('favorites', { favorites: favorites });
});


app.post('/favorite-calculator', function(req, res) {
	let favorite = req.body.newFavorite;
	let favorites = getFavorites(req);

	saveFavorite(favorite, favorites, res);	

	// TODO: Remove this, and 
	res.render('index', {allCalculators: allCalculators});
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
 * @param favorite: The name of the calculator a user wants to favorite
 * @param favorites: The user's current favorites (stored in a cookie)
 * @param res: The response object
 */
function saveFavorite(favorite, favorites, res) {
	if(favorites != undefined) {
		if (!favorites.includes(favorite)) {
			console.log('adding favorite...');
			favorites.push(favorite);
			res.cookie('favorites', favorites);
		} else {
			console.log('favorite is already added!');
		}
	} else {
		console.log('creating new cookie...');
		res.cookie('favorites', [favorite]);
	}
}
