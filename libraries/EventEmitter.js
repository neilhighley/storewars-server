var Pusher = require('pusher');
var gameState = require('./GameState.js')
var env = require('env2')('./config.env');
var https = require('https');
var twilio = require('twilio')(
  process.env.TWILIO_AUTH,
  process.env.TWILIO_TOKEN
);


var twilioNumber = process.env.TWILIO_NUMBER;
var neilNumber = process.env.NEIL_NUMBER;


var message = 'Hi ' + 'neil' + ' from ' +
  'blue' + ' team' +'.\n' + "Just got of the tube? Be the first to capture the starbucks opposite Liverpool st. station and get your team 10% off coffie all day.";
sendText(neilNumber, message);


var config = {
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  encrypted: true // use HTTPS
};

var pusher = new Pusher(config);

function sendText(number, message) {
  twilio.messages.create({
    to: number,
    from: twilioNumber,
    body: message
  }, function(err, message) {
    if (err) {
      console.log(err);
    }
  });
}

function makeYoyoRequest() {

  var optionsuser = {
    hostname: 'api.yoyoplayground.net',
    path: '/v1/accounts/526fe8fa-7878-43c5-8ba6-45553ebb1b9a/transactions',
    method: 'GET',
    headers: {
      Authorization: 'Basic cGFjZXdheTp2dWdn',
      HTTP_YOYO_TOKEN: '97D4C4F8AFF3415BB4728B9E4B68C993'
    }
  };
  var body = '';
  var userReq = https.request(optionsuser,function(res){
    res.on('data',function(chunk){
      body += chunk;
    });
    res.on('end',function(){
      console.log(JSON.parse(body).data[0].amount);
      var amount = JSON.parse(body).data[0].amount;
      if (amount === payEvents[0].amount) {
        e = payEvents.shift().event;
        pusher.trigger('StoreWars', 'areaevent', e);
      }
      // var d = new Date(JSON.parse(body).data[0].created_at);
      // var tDiff = (Date.now() - d.getTime()) / 1000;
      // console.log(tDiff/60);
      // if (tDiff/60 < 200) {
      //   var target = {
      //     identifier: 'red'
      //   };
      //   console.log('go!');
      //   pusher.trigger('StoreWars', 'areaevent', {name: 'payEvent', flavour: "hey!", target: target});
      // }
      // var date = JSON.parse(body).data[0].created_at;
      // var timearr = date.split('T')[0];
      // console.log(timearr);
      // console.log(Date.now());
      // console.log(JSON.parse(body).data[0].created_at);
      // console.log(body);
      // callback(JSON.parse(body).login);
    });
  });

  // userReq.setHeader('User-Agent','fac-hack');
  userReq.end();
}

var payEvents = [
  {
    amount: 100,
    event: {
      flavour: 'The other team has captured the starbucks opposite Liverpool st. station. retake it and get your team 10% off coffie all day.',
      name: "Recapture starbucks",
      target: {
        identifier: 'red'
      }
    }
  },
  {
    amount: 200,
    event: {
      name: 'Lost starbucks',
      flavour: "bad luck, go and buy some cake",
      target: {
        identifier: 'blue'
      }
    }
  },
  {
    amount: 300,
    event: {
      name: 'zombie attack!',
      flavour: "run",
      target: {
        identifier: 'red'
      }
    }
  },
  {
    amount: 400,
    event: {
      name: 'zombie attack!',
      flavour: "run",
      target: {
        identifier: 'blue'
      }
    }
  },
  {
    amount: 500,
    event: {
      name: 'payEvent4',
      flavour: "hey!",
      target: {
        identifier: 'blue'
      }
    }
  }
];

setInterval(makeYoyoRequest, 1000);

module.exports = function(eventData) {
  // console.log('event data: ', eventData);
  if (eventData.willText) {
    var offlineUsers = gameState.getOfflineUsers();
    offlineUsers.forEach(function(offlineUser) {
      if (
        gameState.checkTarget(eventData.target, offlineUser) &&
        offlineUser.number
      ) {
        var message = 'Hi ' + offlineUser.name + ' from ' +
          offlineUser.team + ' team' +'.\n' + eventData.flavour;
          // console.log(offlineUser.number, message);
        // sendText(offlineUser.number, message);
      }
    });
  }
  // pusher.trigger('StoreWars', 'areaevent', eventData);
}
