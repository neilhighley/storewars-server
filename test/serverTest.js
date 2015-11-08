var eventEmmiter = require('../libraries/EventEmitter.js');
var app = require('../app.js');

function fakeEvent(data) {
    console.log(data);
}

var gameState = require('../libraries/GameState.js')
gameState.setEmmiter(eventEmmiter);
// console.log(gameState.getOfflineUsers());


var testEvents = [
    {
        type: 'userRegisterEvent',
        data: {
            userId: 1,
            lat: 11.3,
            long: 3.1,
            team: 'blue',
            name: 'eoin'
        }
    },
    {
        type: 'areaCaptureEvent',
        data: {
            userId: 1,
            areaId: 1
        }
    },
    {
        type: 'offerRedemptionEvent',
        data: {
            userId: 1,
            areaId: 1,
            name: 'starbucks',
            team: 'blue'
        }
    }
].forEach(function(event) {
    gameState.eventHandler(event)
});

// console.log(gameState.getOfflineUsers());
