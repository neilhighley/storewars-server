var request = require('supertest');
//var Shot = require('shot');
var app = require('../app.js');


//var app = require('../app.js');
//
//function handleRegestrationRequest(req, res, next) {
//    res.end('woah!');
//}

//Test('test test', function(tester) {
var regBody = {
    userId: 1,
    lat: 11.3,
    long: 3.1,
    team: 'blue'
};
request(app).post('/registerUser')
    .send(regBody)
    .expect('Content-Type', /json/)
    .end(function(err, res){
        console.log('response: ', res.body);
        if (err) console.log(err);
    });

regBody = {
    userId: 1,
    lat: 11.3,
    long: 3.1,
    team: 'blue'
};

request(app).post('/viewNearbyEvents')
    .send(regBody)
    .expect('Content-Type', /json/)
    .end(function(err, res){
        console.log('response: ', res.body);
        if (err) console.log(err);
    });

regBody = {
    userId: 1,
    areaId: 2
};

request(app).post('/claimArea')
    .send(regBody)
    .expect('Content-Type', /json/)
    .end(function(err, res){
        console.log('response: ', res.body);
        if (err) console.log(err);
    });

regBody = {
    userId: 1,
    eventId: 2
};

request(app).post('/claimEvent')
    .send(regBody)
    .expect('Content-Type', /json/)
    .end(function(err, res){
        console.log('response: ', res.body);
        if (err) console.log(err);
    });


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