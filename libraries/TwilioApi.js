var TwilioApi=function(app){

    	// Twilio Credentials 
    var accountSid = 'AC97c7fd6f6204c6812add2672c59a2c3c'; 
    var authToken = '5e018ccc02ed657eeb67f31b019fed4c'; 
     
    //require the Twilio module and create a REST client 
    var client = require('twilio')(accountSid, authToken); 
     

    app.get('/testtwilio', function(req, res) {
    	client.messages.create({ 
    		to: "+447768567715", 
    		from: "+441992351777", 
    		body: "Hello from Vlad's Twilio"
    	}, function(err, message) { 
    		console.log(message.sid); 
    	});
    });
}

module.exports = TwilioApi;