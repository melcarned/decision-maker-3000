var http, director, cool, bot, router, server, port;

http        = require('http');
director    = require('director');
cool        = require('cool-ascii-faces');
bot         = require('./bot.js');

/*test
bot.respond();
*/

var MTA_ID = process.env.MTA_API_KEY;

var Mta = require('mta-gtfs');
var mta = new Mta({
  key: '8e0980acaacf6c95b01eec5b261e1dc7', // only needed for mta.schedule() method
  feed_id: 1                  // optional, default = 1
});

mta.schedule(200).then(function (result) {
  console.log(result);
});


/*
var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var request = require('request');

var requestSettings = {
  method: 'GET',
  url: 'http://datamine.mta.info/mta_esi.php?key=8e0980acaacf6c95b01eec5b261e1dc7',
  encoding: null
};

request(requestSettings, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var feed = GtfsRealtimeBindings.FeedMessage.decode(body);
    feed.entity.forEach(function(entity) {
      if (entity.trip_update) {
        console.log(entity.trip_update);
      }
    });
  }
});
*/
/*
router = new director.http.Router({
  '/' : {
    post: bot.respond,
    get: ping
  }
});

server = http.createServer(function (req, res) {
  req.chunks = [];
  req.on('data', function (chunk) {
    req.chunks.push(chunk.toString());
  });

  router.dispatch(req, res, function(err) {
    res.writeHead(err.status, {"Content-Type": "text/plain"});
    res.end(err.message);
  });
});

port = Number(process.env.PORT || 5000);
server.listen(port);

function ping() {
  this.res.writeHead(200);
  this.res.end("hello mate " + (Math.floor(Math.random() * 100) + 1));
}
*/
