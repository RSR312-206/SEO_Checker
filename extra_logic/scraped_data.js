//todo: build a function that handles the href tags and removes all invalid
//or non-relevant urls
//then attach the website domain to the links that begin with a '/' so the
//full url can be evaluated with response.statusCode
var exceptions =  {
//trying to clean the html code that is scraped in
  check_scraped_data: function(href) {
    var domain = website.url.split('');
    if(href !== undefined || href !== '#') {
      urls.push(href);
    }
    var a = href.split('');
    if (a[0] == '/' && a[0] !== a) {
      //getting the domain here?
      a = domain + a;
      urls.push(a);
    }
  }
};

module.exports = exceptions;