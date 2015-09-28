var db = require('../models/index');
var cheerio = require('cheerio');
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
  db.Website.create(req.body.website, function (err, website) {
    if(err) {
      console.log(err);
    }

    var CryptoJS = require("crypto-js");
    var SHA1 = require("crypto-js/sha1");
    var accessId;
    var secretKey;
    var objectURL = website.url;
    var expires = Date.now() + 300;
    var stringToSign = accessId + "\n" + expires;
    var cols = "32";
    var hash = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(stringToSign, secretKey));
    var signature = encodeURIComponent(hash);
    var requestUrl = "http://lsapi.seomoz.com/linkscape/url-metrics/"+encodeURIComponent(objectURL)+"?Cols="+cols+"&Limit=10&AccessID="+accessId+"&Expires="+expires+"&Signature="+signature;

    request.get(requestUrl, function (error, response, body) {
      var ueid = JSON.parse(body);
      console.log(ueid);
      console.log(error);
      db.siteLink.create(ueid, function (err, siteLink) {
        if(err) {
          console.log(err)
        }
        website.link = siteLink;
        console.log(siteLink);
        website.save();
      });
    });
    request.get(website.url, function (error, response, html) {
      var urls = [];
      var success = [];
      var fail = [];
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        $('a').each(function(i, element){
          var aTag = $(this);
          urls.push(aTag.attr('href'));
        });
      }
      db.siteLink.create( {urls: urls, website: website, success: success, fail: fail }, function (err, siteLink) {
        if(err) {
          console.log(err);
        }
        siteLink.urls.forEach(function(url) {
          request(url, function (error, response, body) {
            if (error) {
              console.log(error);
            }
            if (!error && response.statusCode < 400) {
                siteLink.success.push(url);
            } else if (!error && response.statusCode > 399) {
              siteLink.fail.push(url);
            }
            siteLink.save();
            website.link = siteLink;
            website.save();
          });
        });
        res.redirect('/websites');
      });
    });
  });
});

//show

app.get('/websites/:id', function (req, res) {
  db.Website.findById(req.params.id).populate('link').exec( function (err, website) {
    if(err) {
      console.log(err);
    }
    console.log(website.link[0].ueid);
    res.render('websites/show', {website: website} );
  });
});

//Edit
app.get("/websites/:id/edit", function(req,res) {
  db.Website.findById(req.params.id).exec(
    function (err, website) {
      if (err) {
        console.log(err)
      }
      res.render("websites/edit", {website: website});
  });
});
//Update
app.put("/websistes/:id", function (req, res) {
  db.Website.findByIdAndUpdate(req.params.id).exec(
    function (err, website) {
      if (err) {
        console.log(err);
      }
      if (req.session.id == website.user) {
        website.url = req.body.website.url;
        website.save();
      }
      res.redirect('/websites');
    });
});

//delete

app.delete('/websites/:id', function(req,res){
  db.Website.findByIdAndRemove(req.params.id, function(err,website){
    res.redirect('/websites');
  });
});



