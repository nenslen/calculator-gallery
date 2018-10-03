let express = require('express');
let app = express();
let server = require('http').Server(app);
let ejs = require('ejs');

let calculators = [
	'square',
	'distance'
];

app.set('view engine', 'ejs');
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/media', express.static(__dirname + '/media'));
app.use('/html', express.static(__dirname + '/html'));
app.get('/', function(req, res) {
    res.render('index', {calculators: calculators});
});

server.listen(8081, function() {
    console.log('Listening on ' + server.address().port);
});
