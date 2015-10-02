var exceptions =  {
//trying to clean the html code that is scraped in
  check_scraped_data: function(href) {
    var domain = website.url.split('');
    if(href !== undefined || href !== '#') {
      urls.push(href);
    }
    var a = href.split('');
    if (a[0] == '/' && a[0] !== a) {
      a = domain + a;
      urls.push(a);
    }
  }
};

module.exports = exceptions;