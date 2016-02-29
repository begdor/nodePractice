'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');

var app = express();

//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('Secret'));

app.use(expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
var User = require('./models/User');
//MARK: connect to mongodb in Promise constructor 
mongoose.connect('mongodb://localhost/sample',function (err,db){
	if(err)
		console.log("Error: MongoDB connection fails");
	else{	
		var userDoc = new User({username:"likun", password:"123"});
		userDoc.save(function(err,userDoc){
			if (err) return console.error(err);
		});
	}
});

// User.findById('sometid', function(err, user) {// user})


var checkAuth = function(req,res,next){
	if(!req.session.user_id){
		res.send('You are not authorized to view this page');
	}
	else next();
}

app.use('/personal_page',checkAuth);
app.get('/personal_page',function(req,res){
	res.send('Welcome back!');
});



app.post('/login',function(req,res){
	var post = req.body;
	var password = "default";
	//TODO: using mongoose to verify the login infomation


	//MARK: connect ot mongoose and verify the login information
	var promise = User.getByUsername(post.user);
	promise.then(function(user){
		password = user.password;
		if(password === post.password){
			req.session.user_id = user._id;
			res.redirect('/personal_page');
		}
		else res.send('Incorrect username/password');
	},function(err){
		console.log(error);
	});
});

//MARK: render template login page
app.set('view engine','jade');

app.get('/',function(req,res){
	res.render('new_login',{title:'Login',message:'Welcome To Login Page:'});
});

app.get('/logout',function(req,res){
	delete req.session.user;
	res.redirect('/login');
});

app.listen(8081, function(){
	console.log('Login app listening on port 8080!');
});