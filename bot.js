var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;
var images = [
  "https://i.groupme.com/1200x676.jpeg.88c57afb3454485aa8156f2d3e871261",
  "https://i.groupme.com/529x433.jpeg.9292a98cd15e4955923de1c564b391d7",
  "https://i.groupme.com/450x299.jpeg.e3f75580c4f74edbbf723b30689ab172",
  "https://i.groupme.com/1000x667.jpeg.81b0b68fe4244149989253d6b03ba634",
  "https://i.groupme.com/759x422.jpeg.8daf773eeadd4ed98959e30301faa87f",
  "https://i.groupme.com/1300x957.jpeg.20aa0c3490024a0ea69980ac4f30485e",
  "https://i.groupme.com/360x240.jpeg.ce1fc0f866ef45cab7acb38b9315259b",
  "https://i.groupme.com/1536x826.jpeg.e35e46a939e7464e8bb2aa991fcca01b",
  "https://i.groupme.com/640x334.jpeg.875b0386de6e4ee9939d6793cf052db8",
  "https://i.groupme.com/1000x664.jpeg.3a3d11123004463fa1bfd946fecb1124"
];


function respond() {
  var request = "@DM3K Should I go to the gym?", //JSON.parse(this.req.chunks[0]),
      botRegex = /^@DM3K Should I/i;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);

    //Get action to decide on
    var decision = request.text.substr(str.indexOf("@DM3K Should I") + 1);
    console.log(decision);
    postMessage(decision);
/*
    if(decison !== "") {
      var maxNumber = request.text.match(maxRegex);
      postMessage("Calculating...\n" + String(Math.floor(Math.random() * Number(maxNumber[0])) + 1) + "!");
      console.log("Calculating decision.");
    } else {
      postMessage("Please let me know what the max random number should be. Example /RNG 100 will give you a number between 1 and 100 (including 1 and 100).");
      console.log("Action to decide on was not entered.");
    }
*/
    this.res.end();
  } else {
    console.log("What in tarnation!?!");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(randomNumber) {
  var botResponse, options, body, botReq;

  botResponse = randomNumber;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "attachments" : [
      {
        "type"  : "image",
        "url"   : images[Math.floor(Math.random() * 9)]
      }
    ],
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

exports.respond = respond;
