var db = require('../models/index');
var loginMiddleware = require('../middleware/loginHelper');
var routeMiddleware = require('../middleware/routeHelper');
var request = require('request');

//TODO:
//add route helpers
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
  db.Website.create(req.body.website,
    function(err, website) {
      if(err) throw err;

      var CryptoJS = require("crypto-js");
      var SHA1 = require("crypto-js/sha1");
      var accessId;
      var secretKey ;
      var objectURL = website.url;
      var expires = Date.now() + 300;
      var stringToSign = accessId + "\n" + expires;
      var cols = "32";
      var hash = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(stringToSign, secretKey));
      var signature = encodeURIComponent(hash);
      var requestUrl = "http://lsapi.seomoz.com/linkscape/url-metrics/"+encodeURIComponent(objectURL)+"?Cols="+cols+"&Limit=10&AccessID="+accessId+"&Expires="+expires+"&Signature="+signature;

      request.get(requestUrl, function(error, response, body) {
        var ueid = JSON.parse(body);
        db.siteLink.create(ueid, function(err, siteLink) {
          if(err) throw err;
          website.link = siteLink;
          website.save();
          res.redirect('/websites');
        });
      });
  });
});

//show

app.get('/websites/:id', function (req, res) {
  db.Website.findById(req.params.id).populate('link').exec(
  function(err, website) {
    if(err) throw err;
    res.render('websites/show', {website: website} );
  });
});

//update




//delete

app.delete('/websites/:id', function(req,res){
  db.Website.findByIdAndRemove(req.params.id, function(err,website){
    res.redirect('/websites');
  });
});

