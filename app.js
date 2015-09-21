var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var db = require('./models');

app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static("public"));

app.get('/', function(req, res) {
  res.render('websites/index');
})


app.listen(3000, function() {
  console.log('server is running');
});