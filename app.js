var express = require('express');
app = express();

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var db = require('./models');
session = require('cookie-session');
var request = require('request');
var loginMiddleware = require('./middleware/loginHelper');
var routeMiddleware = require('./middleware/routeHelper');
var request = require('request');
var cheerio = require('cheerio');

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static("public"));
app.set('view engine', 'ejs');

//session
app.use(session({
  maxAge: 36000000,
  secret: 'seo_secret',
  name: 'seo'
}));

//middleware
app.use(loginMiddleware);

//Controllers
require('./controllers/index');


//server

app.listen(process.env.PORT || 3000, function() {
  console.log('server is running');
});