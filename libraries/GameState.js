var env = require('env2')('./config.env');

var eventEmmiter;

var teams = [
  'red',
  'blue'
];

function getFirstOppositeTeam(team) {
  return teams.filter(function(oppositeTeam) {
    return oppositeTeam !== team;
  })[0];
}

var registeredUsers = [
  {
    userId: 1,
    lat: 11.3,
    long: 3.1,
    team: 'blue',
    name: 'eoin'
  },
  {
    userId: 10,
    lat: 10.3,
    long: 3.12,
    team: 'blue',
    name: 'neil',
    number: process.env.NEIL_NUMBER
  }
];
var happenings = [
  {
      id: 1,
      title: 'Capture starbucks!',
      flavour: 'Just got of the tube? Be the first to capture the starbucks opposite Liverpool st. station and get your team 10% off coffie all day.',
      lat: 1,
      long: 2,
      name: "starbucks",
      type: 'challenge',
      willText: true
  },
  {
      id: 2,
      title: 'Retake starbucks',
      flavour: 'The other team has captured the starbucks opposite Liverpool st. station. retake it and get your team 10% off coffie all day.',
      lat: 1,
      long: 2,
      name: "starbucksRetake",
      type: 'challenge',
      willText: true
  }
];

var offers = [
  {
      id: 1,
      target: 'team',
      title: '10% off coffee',
      flavour: "Team member captured starbucks. 10% off coffee",
      name: 'starbucks',
      type: 'offer',
      willText: true
  },
  {
      id: 2,
      target: 'user',
      title: 'Discount on drones',
      flavour: 'If you like coffee you\'ll love drones. Get ten pounds of at the argos opposite',
      name: 'drone',
      type: 'offer'
  }
];

var users = [];

var areas = [
  {
      id: 1,
      name: 'starbucks'
  },
  {
      id: 2,
      team: 'unclaimed'
  },
  {
      id: 3,
      team: 'unclaimed'
  }
];

var getOfflineUsers = function() {
  return registeredUsers.filter(function(registeredUser) {
    return (typeof getFirstByKey(users, 'userId', registeredUser.userId) === 'undefined');
  });
}

function checkTarget(target, user) {
  if (target.type === 'team') {
    return target.identifier === user.team;
  } else {
    return target.identifier === user.team;
  }
}

var eventHandler = function(triggerEvent) {
  var eventType = triggerEvent.type;
  console.log("event: ", eventType);
  if (eventType === 'userRegisterEvent') {
    registerUser(triggerEvent, eventEmmiter);
  } else if (eventType === 'areaCaptureEvent') {
    areaCapturedEvent(triggerEvent, eventEmmiter);
  } else if (eventType === 'offerRedemptionEvent') {
    offerRedemptionEvent(triggerEvent, eventEmmiter);
  }
};

function registerUser(triggerEvent, eventEmmiter) {
  var userId = triggerEvent.data.userId;
  var userTeam = triggerEvent.data.team;
  var lat = triggerEvent.data.lat;
  var long = triggerEvent.data.long;
  var nearbyHappenings = viewNearbyHappenings(userId, lat, long, userTeam);
  addUser(userId, userTeam);
  nearbyHappenings.forEach(function(happening) {
    happening.target = {
      type: 'user',
      identifier: userTeam
    };
  });
  eventEmmiter(nearbyHappenings[0]);
}

function addUser(userId, userTeam) {
  users.push({
      userId: userId,
      team: userTeam,
      time: Date.now()
  });
}

function areaCapturedEvent(triggerEvent, eventEmmiter) {
var areaToClaim = getFirstByKey(areas, 'id', triggerEvent.data.areaId);
  var teamClaiming = getTeamFromUserId(triggerEvent.data.userId);
  areaToClaim.team = teamClaiming;
  if (areaToClaim.name === 'starbucks') {
    var offer = getFirstByKey(offers, 'name', 'starbucks');
    offer.team = teamClaiming;
    offer.target = {
      type: 'team',
      identifier: teamClaiming
    };
    eventEmmiter(offer);
    var retakeEvent = getFirstByKey(happenings, 'name', 'starbucksRetake');
    retakeEvent.target = {
      type: 'team',
      identifier: getFirstOppositeTeam(teamClaiming)
    };
    eventEmmiter(retakeEvent);
  } else {
    eventEmmiter(triggerEvent);
  }
}

function offerRedemptionEvent(triggerEvent, eventEmmiter) {
  if (triggerEvent.data.name === 'starbucks') {
    var eventResponse = getFirstByKey(offers, 'name', 'drone');
    eventResponse.target = {
      type: 'user',
      identifier: triggerEvent.data.team
    };
      eventEmmiter(getFirstByKey(offers, 'name', 'drone'));
  }
}


function viewNearbyHappenings(userId, lat, long, userTeam) {
  return happenings.filter(function (event) {
      return getDistSquared(event.lat, lat, event.long, long) < 2;
  });
}

function getDistSquared(x1, x2, y1, y2) {
  var dx = x2-x1;
  var dy = y2-y1;
  return dx^dx + dy*dy;
}

function claimEvent() {
  return {
      stub: 'yeah!'
  };
}

function claimArea(areaId, userId) {
  var areaToClaim = getAreaById(areaId);
  var teamClaiming = getTeamFromUserId(userId);
  areaToClaim.team = teamClaiming;
  return areaToClaim;
}

function getFirstByKey(objArray, key, value) {
  return objArray.filter(function(obj) {
      return obj[key] === value;
  })[0];
}

function getTeamFromUserId(userId) {
  return getFirstByKey(users, 'userId', userId).team;
}

function setEmmiter(newEventEmmiter) {
  eventEmmiter = newEventEmmiter;
}

module.exports = {
  setEmmiter: setEmmiter,
  eventHandler: eventHandler,
  getOfflineUsers: getOfflineUsers,
  checkTarget: checkTarget
}
