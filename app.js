/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

var index = require('./routes/index');
var home = require('./routes/home');
var newPolling = require('./routes/newPolling');
var polling = require('./routes/polling');

var pollingVote = require('./routes/pollingVote');
var create = require('./routes/create');

// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.delete('/', index.view);
app.get('/home', home.view);
app.post('/home', home.view);
app.get('/newPolling', newPolling.view);
app.post('/polling/new', polling.create);
app.post('/polling/:id', polling.pollingSubmit);
app.get('/pollingVote/:id', pollingVote.view);
app.get('/polling/:id', polling.view);
app.get('/pollingVote', pollingVote.view);
app.get('/create', create.view);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});