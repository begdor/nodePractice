var express = require('express'); // load express as a module
var app = express();

//MARK: write a middleware requestTime to add requestTime to the req:
//middleware is like request's handlers
var requestTime = function(req,res,next){
	req.requestTime = Date.now();
	next();
}

var reqeustURL = function(req,res,next){
	console.log('Request URL:',req.originalUrl);
	next();
}
var requestType = function(req,res,next){
	console.log('Request Type:',req.method);
	next('err');
}

app.use('/',requestTime);

// TODO: Use Express router
// TODO: separate those into different files

//MARK: mount these two middleware to the path '/user'
app.use('/user',reqeustURL,requestType);
//MARK: callback function: res send response hello world
// the app respond with hello world for request to route(in my case,
// root URL)
//MARK: display timestamp of request in the browser
app.get('/',function(req,res){
	var responseText = 'Hello World! ';
	var date = new Date(req.requestTime);
	responseText += 'Requested at: ' + date.getYear()+'/'+ date.getMonth()+'/'+date.getDate() + '';
	res.send(responseText);
});

app.get('/user', function(req,res){
	res.send('Welcome to the user page!');
});

//MARK: testing a genetic error handler, explicitly calling next('err') in
// the middleware to the path '/user'
//TODO: don't know how to generate error with nodejs
app.use(function(err,req,res,next){
	res.status(500);
	res.render('error', { title: 'Error', message:'Error code: 500 '});
});

/* also app.set('views','./views')
* template files are located at views directory in the app's root dir
* view engine specify the template engine, in this case, jade
* ** Notice: jade is whitespace sensitive!!!
*/
app.set('view engine','jade');

app.get('/render', function (req, res){
	var title = 'Hey';
	var message = 'Hello there!';
	res.render('index', { title: title , message: message});
});

// make mongoose connection here

//MARK: start a server and listen on port 3000. 
app.listen(3000, function(){
	console.log('Example app listening on port 3000!');
})
