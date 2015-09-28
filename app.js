var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var db = require('./models');
var session = require('cookie-session');
var request = require('request');
var loginMiddleware = require('./middleware/loginHelper');
var routeMiddleware = require('./middleware/routeHelper');
var request = require('request');
var cheerio = require('cheerio')


app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static("public"));
app.use(loginMiddleware);
require('./controllers/index');

//session
app.use(session({
  maxAge: 36000000,
  secret: 'seo_secret',
  name: 'seo'
}));

//Controllers
require('./controllers/index');



app.listen(3000, function() {
  console.log('server is running');
});