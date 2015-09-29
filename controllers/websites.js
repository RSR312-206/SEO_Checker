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
    //SEOMoz api call for global backlinks count
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
      //ueid is the code used by Moz for the global backlink api call
      var ueid = JSON.parse(body).ueid;
      var urls = [];
      var success = [];
      var fail = [];
        request(website.url, function (error, response, html) {
          //scrapes website for all valid href tags and pushes into urls array
          if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            $('a').each(function(i, element){
              var aTag = $(this);
              console.log(aTag.attr('href'));
              if(aTag.attr('href') !== undefined) {
              urls.push(aTag.attr('href'));
              }
            });
            console.log(urls);
          }
          urls.forEach(function(url) {
            request(url, function (error, response, body) {
              //checks the scraped urls for their status code, pushes the results into success and fail
              if (error) {
                console.log(error);
              }
              if (!error && response.statusCode < 400) {
                  success.push(url);
              } else if (!error && response.statusCode == 404) {
                fail.push(url);
              }
            db.siteLink.create( {website: website, ueid: ueid, urls: urls,  success: success, fail: fail}, function (err, siteLink) {
              if(err) {
                console.log(err)
              }
              website.link = siteLink;
              website.save();
              console.log(website.link);
            });
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
    console.log(website);
    res.render('websites/show', {website: website} );
  });
});

//Edit
app.get("/websites/:id/edit", function (req,res) {
  db.Website.findById(req.params.id).exec(
    function (err, website) {
      console.log(website);
      if (err) {
        console.log(err)
      }
      res.render("websites/edit", {website: website});
  });
});

//Update
app.put("/websistes/:id", function (req, res) {
  db.Website.findByIdAndUpdate(req.params.id, req.body.website, function (err, website) {
      if (err) {
        console.log(err);
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



