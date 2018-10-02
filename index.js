// MONGODB sudo systemctl start mongodb

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

// MongoClient.connect(url, { useNewUrlParser: true }, function(err, client){
			
//     const db = client.db("flg");
//     const collection = db.collection("user");
//     let user = {name: "Tom", age: 23};
//     collection.insertOne(user, function(err, result){
					
//         if(err){ 
//             return console.log(err);
//         }
//         console.log(result.ops);
//         client.close();
//     });
// });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
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


		res.render("main/homePage.ejs", {title: "Home page"});
	} else {
		res.redirect('/authorization/login');
	}
});

app.get('/authorization/login', function(req, res){
	res.render("authorization/loginForm.ejs", {title: "Login page"});
});

app.post('/authorization/login', function(req, res){
	// TO DO...
	res.redirect('/');
});

app.get('/authorization/register', function(req, res){
	res.render("authorization/registerForm.ejs", {title: "Register page"});
});

app.post('/authorization/register', function(req, res){
	var userLogin = req.body.login;
	var userPassword = req.body.password;
	var userPasswordConfirm = req.body.passwordConfirm;

	if (userPassword != userPasswordConfirm) {
		res.render("authorization/registerForm.ejs", {
			title: "Register page",
			error: "Passwords do not match!"
		});
	} else {
		MongoClient.connect(url, {useNewUrlParser: true}, function(err, client){

			var db = client.db("flg");
			var collection = db.collection("user");
			var data = {
					_id: userLogin,
					login: userLogin,
					password: userPassword
				};
			collection.insertOne(data, function(err, result){

					if(err){ 
						res.render("authorization/registerForm.ejs", {
							title: "Register page",
							error: "User is already registered!"
						});
					} else {
						console.log("New User Registred...");
						res.redirect("/authorization/login");
					}

					client.close();
			});
		});




	// 	var coll = myDB.collection("user");
	// 	coll.insert({_id: userLogin, login: userLogin, password: userPassword}, function(err){
	// 		if (err) {
	// 			res.render("authorization/registerForm.ejs", {
	// 				title: "Register page",
	// 				error: "User is already registered!"
	// 			});
	// 		} else {
	// 			console.log("New User Registred...");
	// 			res.redirect("/register/loginForm");
	// 		};
	// });



	}
});

var port = 3000;
app.listen(port, function(err){
	console.log('Server started...');
	console.log('Listening port ' + port + '...');
});
