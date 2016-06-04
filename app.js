var twit = require('twit');
var env = require('node-env-file');
var fs = require('fs');

env(__dirname + '/.env');

var t = new twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var file = 'tweets.txt';
var array = fs.readFileSync(file).toString().split('\n');

tweet(array.splice(0,1)[0]);

fs.writeFile(file, array.join('\n'), function (err) {
  if (err) { console.log(err); }
});

function tweet(line) {
  t.post('statuses/update', { status: line }, function(err, data, response) {
      if (err) {
        console.log(err);
        return;
      }
      console.log('posted', status);
  });
}
