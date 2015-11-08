var Pusher = require('pusher');
var gameState = require('./GameState.js')
var env = require('env2')('./config.env');
var twilio = require('twilio')(
  process.env.TWILIO_AUTH,
  process.env.TWILIO_TOKEN
);

var twilioNumber = process.env.TWILIO_NUMBER;
var neilNumber = process.env.NEIL_NUMBER;
// console.log('----------->', typeof neilNumber);

var config = {
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  encrypted: true // use HTTPS
};

var pusher = new Pusher(config);


module.exports = function(eventData) {
  console.log('event data: ', eventData);
  if (eventData.willText) {
    var offlineUsers = gameState.getOfflineUsers();
    offlineUsers.forEach(function(offlineUser) {
      if (offlineUser.number) {
        var message = 'Hi ' + offlineUser.name + ' from ' + offlineUser.team + ' team' +'.\n';
        message += eventData.flavour;
        twilio.messages.create({
          to: offlineUser.number,
          from: twilioNumber,
          body: message
        }, function(err, message) {
          if (err) {
            console.log(err);
          }
        });
      }
    });
    console.log('will text event', gameState.getOfflineUsers());
  }
  // if (false && eventData.willText) {
  //
  // }
  pusher.trigger('StoreWars', 'areaevent', eventData);
}
