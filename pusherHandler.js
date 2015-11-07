var Pusher = require('pusher');
require('env2')('./config.env');
var app = require('./app.js');
var dataHandler = require('./libraries/gameState.js');


var config = {
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    encrypted: true // use HTTPS
};

var pusher = new Pusher(config);

function pushEvent(eventId) {
    var event = dataHandler.getEventById(eventId);
    pusher.trigger('StoreWars', 'areaevent', event);
}

function testPush() {
    pushEvent(1);
    pusher.trigger('StoreWars', 'areaevent', {
        data: 'WOAH!'
    });
}

module.exports = {
    testPush: testPush
};