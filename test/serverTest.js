
var app = require('../app.js');

function fakeEvent(data) {
    console.log(data);
}

var gameState = require('../libraries/GameState.js')(fakeEvent);

var testEvents = [
    {
        type: 'userRegisterEvent',
        data: {
            userId: 1,
            lat: 11.3,
            long: 3.1,
            team: 'blue'
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
            name: 'starbucks'
        }
    }
].forEach(function(event) {
    gameState.eventHandler(event)
});
