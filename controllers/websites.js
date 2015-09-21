var db = require('../models/index');
var loginMiddleware = require('../middleware/loginHelper');
var routeMiddleware = require('../middleware/routeHelper');

//index

app.get('/websites', function(req, res) {
  db.Website.find({}, function(err, website) {
    if (err) {
      res.render('404');
    } else {
  res.render('websites/index', {websites: website});
    }
  });
});

//create
app.get('/websites/new', function(req, res) {
  res.render('websites/new');
});

app.post('/websites', function(req, res) {
  db.Website.create(req.body.url)
})

//show




//update




//delete


