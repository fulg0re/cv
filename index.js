// MONGODB sudo systemctl start mongodb

var express = require('express');
var path = require('path');

var app = express();

// var MongoClient = require('mongodb').MongoClient;
// var myDB = null;

// var url = 'mongodb://localhost:27017/flg';
// var myDB = MongoClient.connect(url, { useNewUrlParser: true });

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
	var isAuthenticated = false;

	if (isAuthenticated) {
		// var coll = myDB.collection("users");
		// coll.insert({_id: 1, login: 'userLogin', password: 'userPassword1', email: 'userEmail'}, 
		// 	function(err){
		// 	if (err) {
		// 		console.log('ERROR');
		// 	} else {
		// 		console.log('OK OK OK');
		// 	};
		// });


		res.render("main/homePage.ejs");
	} else {
		res.redirect('/authorization/login');
	}
});

app.get('/authorization/login', function(req, res){
	res.render("authorization/loginForm.ejs");
});

app.post('/authorization/login', function(req, res){
	res.redirect('/');
});

var port = 3000;
app.listen(port, function(err){
	console.log('Server started...');
	console.log('Listening port ' + port + '...');
});
