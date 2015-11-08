require('env2')('./config.env');
var TwilioApi=function(app){

    	// Twilio Credentials 
    var accountSid = process.env.TWILIO_AUTH;
    var authToken = process.env.TWILIO_TOKEN;
    var twilioNumber = process.env.TWILIO_NUMBER;

	console.log("account sid:"+accountSid);
	console.log("account token:"+authToken);

	var client = require('twilio')(accountSid, authToken);

	app.get('/testtwilio', function(req, res) {
		console.log(req.query);
    	client.messages.create({ 
    		to: '447843247878',
    		from: twilioNumber,
    		body: "Hello from Twilio"
    	}, function(err, message) { 
    		console.log(message);
			console.log(err);
    	});
    });
}

module.exports = TwilioApi;