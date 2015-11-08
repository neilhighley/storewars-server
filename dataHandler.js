var events = [
    {
        id: 1,
        lat: 1,
        long: 2,
        event: "zombies!"
    },
    {
        id: 2,
        lat: 1000,
        long: 20,
        event: "cake!"
    }
];

var users = [];

var areas = [
    {
        id: 1,
        team: 'unclaimed'
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

function addUser(userId, userTeam) {
    users.push({
        userId: userId,
        team: userTeam,
        time: Date.now()
    });
}

function registerUser(userId, lat, long, userTeam) {
    addUser(userId, userTeam);
    return viewNearbyEvents(userId, lat, long, userTeam);
}

function viewNearbyEvents(userId, lat, long, userTeam) {
    //console.log('view nearby events');
    return events.filter(function (event) {
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
    //console.log(1);
    var areaToClaim = getAreaById(areaId);
    //console.log(2);
    //console.log(userId);
    var teamClaiming = getTeamFromUserId(userId);
    //console.log(3);
    areaToClaim.team = teamClaiming;
    console.log('area to claim', areaToClaim);
    return areaToClaim;
}

function getTeamFromUserId(userId) {
    return getUserById(userId).team;
}

function getUserById(id) {
    return users.filter(function(user) {
        return user.userId === id;
    })[0];
}

function getAreaById(id) {
    return areas.filter(function(area) {
        return area.id === id;
    })[0];
}

function getEventById(eventId) {
    return events.filter(function(event) {
        return event.id === eventId;
    })[0];
}

module.exports = {
    viewNearbyEvents: viewNearbyEvents,
    registerUser: registerUser,
    claimEvent: claimEvent,
    claimArea: claimArea,
    getEventById: getHappeningById
};