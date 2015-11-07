var TwilioApi=function(app){

    	// Twilio Credentials 
    var accountSid = ''; 
    var authToken = ''; 
     
    //require the Twilio module and create a REST client 
    var client = require('twilio')(accountSid, authToken); 
     

    app.get('/testtwilio', function(req, res) {
    	client.messages.create({ 
    		to: "+number", 
    		from: "+number", 
    		body: "Hello from Twilio"
    	}, function(err, message) { 
    		console.log(message.sid); 
    	});
    });
}

module.exports = TwilioApi;