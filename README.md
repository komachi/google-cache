# google-cache

Node.js module to check if URL present in Google Cache.

## Installation

    npm install google-cache --save

## Usage

~~~ js
var googlecache = require('google-cache');

googlecache('https://github.com', function(err, data) {
  if (err) {
    console.log(err); // if there was any error
  }
  console.log(data.cache); // URL of the cached page
  console.log(data.cacheTextOnly); // URL of the cached page (text only)
  console.log(data.date); // Date of caching
  console.log(data.title); // Title of the cached webpage
});

~~~
