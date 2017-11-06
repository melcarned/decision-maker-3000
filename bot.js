var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var images = require('images');
var botID = process.env.BOT_ID;
var undecidedMessage = "I'm not sure what to decide on. Please ask me again by saying \"@DM3K Should I [insert your action here]?\"";




function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^@DM3K/ig,
      decisionRegex = /^@DM3K Should I ([\w\d\s]+)/ig;

  console.log(request.text);
  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);

    var decision = decisionRegex.exec(request.text);

    if(decision !== null){
      if(decision[1] !== undefined && decision[1] !== null && decision[1] !== "") {

        //Get action to decide on
        decision[1] = decision[1].trim();
        console.log(decision[1]);

        //Decide
        console.log("Calculating decision.");
        postMessage("Calculating...\n" + decide(decision[1]), true);
        console.log(decide(decision[1]));
        this.res.end("I made a decision.\n");
      } else {
          //Invalid input
          postMessage(undecidedMessage, false);
          console.log("Action to decide on was not entered.");
          this.res.end("I'm unable to decide.\n");
      }
    } else {
        //Invalid input
        postMessage(undecidedMessage, false);
        console.log("Action to decide on was not entered.");
        this.res.end("I'm unable to decide.\n");
      }
  } else {
    console.log("What in tarnation!?!");
    this.res.writeHead(200);
    this.res.end("This is not for me.\n");
  }
}

function decide(decision) {
  var d = Math.floor(Math.random() * 100) + 1;
  if(d > 50) {
    return "I think you should " + decision + ".";
  } else {
    return "I don't think you should " + decision + ".";
  }
}

function postMessage(response, hasDecided) {
  var botResponse, options, body, botReq;

  botResponse = response;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  if(hasDecided) {
    body.attachments = [
      {
        "type"  : "image",
        "url"   : images[Math.floor(Math.random() * 9)]
      }
    ];
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
