var request = require('request');
var cheerio = require('cheerio');

var googlecache = function(url, callback) {
  var cacheUrl = 'https://webcache.googleusercontent.com/search?q=cache:' + encodeURI(url);
  var cacheTextOnly = cacheUrl + '&strip=1';
  request({
    uri: cacheTextOnly
  }, function(error, response, body) {
    if (error) {
      callback(new Error(error));
    }
    if (response.statusCode === 200) {
      var $ = cheerio.load(body);
      var regexp = /.*([0-9]{1,2}) ([a-zA-Z]{3}) ([0-9]{4}) ([0-9]{2}):([0-9]{2}):([0-9]{2}).*/;
      var date = regexp.exec($('div').eq(1).text());
      var month = String(new Date(Date.parse(date[2] +'1, 2012')).getMonth()+1);
      if (month.length === 1) {
        month = '0' + month;
      }
      if (date[1].length === 1) {
        date[1] = '0' + date[1];
      }
      callback(null,{
        cache: cacheUrl,
        cacheTextOnly: cacheTextOnly,
        date: date[3] + '-' + month + '-' + date[1] + 'T' + date[4] + ':' + date[5] + ':' + date[6] + '.000Z',
        title: $('title').text()
      });
      
    }
    else if (response.statusCode === 404) {
      callback(new Error('No such URL in cache'));
    }
    else {
      callback(new Error(response.statusCode));
    }

  });
};

module.exports = googlecache;
