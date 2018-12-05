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
	'bits',
	'average',
	'distance',
	'base-converter',
];

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/media', express.static(__dirname + '/media'));
app.use('/html', express.static(__dirname + '/html'));


app.get('/', function(req, res) {
    res.render('index', {
    	calculators: allCalculators,
    	favorites: getFavorites(req),
    }); 
});


app.get('/favorites', function(req, res) {
	res.render('favorites', {
		calculators: getFavorites(req),
	});
});


server.listen(3000, function() {
    console.log('Listening on ' + server.address().port);
});


/**
 * Gets all of the user's favorited calculators from a cookie.
 *
 * @param req: The request object
 * @return: An array of strings representing the user's favorites (empty if user has no favorites)
 */
function getFavorites(req) {
	let favorites = req.cookies.favorites;
	if (favorites === '' || favorites === undefined) {
		return [];
	} else {
		return favorites.split(',');
	}
}
