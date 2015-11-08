var express = require('express');
var bodyParser = require('body-parser');
var ServerLibrary=require('../libraries/ServerLibrary.js');
var dataHandler = require('../libraries/gameState.js');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var sl=new ServerLibrary();
  res.render('index', sl.GetStatus());
});

router.post('/registerUser', function(req, res, next) {
  var lat = req.body.lat;
  var long = req.body.long;
  var userId = req.body.userId;
  var userTeam = req.body.team;


  res.send(dataHandler.registerUser(userId, lat, long, userTeam));
});

router.post('/triggerTest', function(req, res, next) {
  res.send(dataHandler.registerUser(userId, lat, long, userTeam));
});



router.post('/claimArea', function(req, res, next) {
  var areaId = req.body.areaId;
  var userId = req.body.userId;

  res.send(dataHandler.claimArea(areaId, userId));
});

router.post('/claimEvent', function(req, res, next) {
  var eventId = req.body.eventId;
  var userId = req.body.userId;

  res.send(dataHandler.claimEvent(userId, eventId));
});

router.post('/viewNearbyEvents', function(req, res, next) {
  var lat = req.body.lat;
  var long = req.body.long;
  var userId = req.body.userId;
  var userTeam = req.body.team;

  res.send(dataHandler.viewNearbyEvents(userId, lat, long, userTeam));
});

module.exports = router;
