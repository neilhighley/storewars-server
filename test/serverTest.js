var request = require('supertest');
//var Shot = require('shot');
var app = require('../app.js');
//var pusherHandler = require('../pusherHandler.js');

//var app = require('../app.js');
//
//function handleRegestrationRequest(req, res, next) {
//    res.end('woah!');
//}

//Test('test test', function(tester) {
//var regBody = {
//    userId: 1,
//    lat: 11.3,
//    long: 3.1,
//    team: 'blue'
//};
//request(app).post('/registerUser')
//    .send(regBody)
//    .expect('Content-Type', /json/)
//    .end(function(err, res){
//        console.log('response: ', res.body);
//        if (err) console.log(err);
//    });
//

//regBody = {
//    userId: 1,
//    areaId: 2
//};
//
//request(app).post('/claimArea')
//    .send(regBody)
//    .expect('Content-Type', /json/)
//    .end(function(err, res){
//        console.log('response: ', res.body);
//        if (err) console.log(err);
//    });
//
//regBody = {
//    userId: 1,
//    eventId: 2
//};
//
//request(app).post('/claimEvent')
//    .send(regBody)
//    .expect('Content-Type', /json/)
//    .end(function(err, res){
//        console.log('response: ', res.body);
//        if (err) console.log(err);
//    });

//pusherHandler.testPush();

function fakeEvent(data) {
    console.log(data);
}

var gameState = require('../libraries/GameState.js')(fakeEvent);

//regBody = {
//    userId: 1,
//    lat: 11.3,
//    long: 3.1,
//    team: 'blue'
//};
//
//request(app).post('/viewNearbyEvents')
//    .send(regBody)
//    .expect('Content-Type', /json/)
//    .end(function(err, res){
//        console.log('response: ', res.body);
//        if (err) console.log(err);
//    });
//

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
//
//var testEvent = {
//    type: 'userRegisterEvent',
//    data: {
//        userId: 1,
//        lat: 11.3,
//        long: 3.1,
//        team: 'blue'
//    }
//}
//console.log('1');
//gameState.eventHandler(testEvent);
//console.log(2);
//testEvent = {
//    type: 'areaCaptureEvent',
//    data: {
//        userId: 1,
//        areaId: 2
//    }
//};
////
//gameState.eventHandler(testEvent);






//var req ={
//        method: "GET",
//        url: "/register"
//    };
//
//    app.handle(req, {"hey":"you"});
    //Shot.inject(handleRegestrationRequest, req, function(res) {
    //    console.log(Object.keys(res));
    //    tester.equal(res.statusCode, 200);
    //    tester.end();
    //});
//});