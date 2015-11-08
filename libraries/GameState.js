function gameState(eventEmmiter) {

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
            lat: 1000,
            long: 20,
            event: "cake!"
        }
    ];

    var offers = [
        {
            id: 1,
            target: 'team',
            description: "Team member completed capture starbucks. 10% off coffee",
            name: 'starbucks',
            type: 'offer',
            willText: true
        },
        {
            id: 2,
            target: 'user',
            description: 'If you like coffee you\'ll love drones. Get ten pounds of at the argos opposite',
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
        addUser(userId, userTeam);
        eventEmmiter(viewNearbyHappenings(userId, lat, long, userTeam));
    }

    function addUser(userId, userTeam) {
        users.push({
            userId: userId,
            team: userTeam,
            time: Date.now()
        });
    }

    function areaCapturedEvent(triggerEvent, eventEmmiter) {
        var areaToClaim = getAreaById(triggerEvent.data.areaId);
        var teamClaiming = getTeamFromUserId(triggerEvent.data.userId);
        areaToClaim.team = teamClaiming;
        if (areaToClaim.name === 'starbucks') {
            var offer = getOfferByName('starbucks');
            offer.team = teamClaiming;
            eventEmmiter(offer);
        }
        eventEmmiter(triggerEvent);
    }

    function offerRedemptionEvent(triggerEvent, eventEmmiter) {
        console.log(triggerEvent);
        if (triggerEvent.data.name === 'starbucks') {
            eventEmmiter(getOfferByName('drone'));
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
        console.log('area to claim', areaToClaim);
        return areaToClaim;
    }

    function getAreaByName(name) {
        return areas.filter(function(area) {
            return area.name === name;
        })[0];
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

    function getOfferByName(name) {
        return offers.filter(function(offer) {
            return offer.name === name;
        })[0];
    }

    function getEventById(eventId) {
        return events.filter(function(event) {
            return event.id === eventId;
        })[0];
    }

    return {
        registerUser: registerUser,
        claimEvent: claimEvent,
        claimArea: claimArea,
        getEventById: getEventById,
        eventHandler: eventHandler
    };
}


module.exports = gameState;
