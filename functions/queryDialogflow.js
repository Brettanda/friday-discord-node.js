const dialogflow = require('dialogflow');

module.exports = async content => {	
	const sessionID = "122";

	let config = { 
		credentials: { 
			private_key: process.env.PRIVATEKEY, 
			client_email: process.env.CLIENTEMAIL 
		} 
	} 

	const sessionClient = new dialogflow.SessionsClient(config);
	const sessionPath = sessionClient.sessionPath(process.env.DIALOGFLOWID,sessionID);

	const request = {
		session: sessionPath,
		queryInput: {
			text: {
				text: content,
				languageCode: 'en-US',
			}
		}
	};

	const responses = await sessionClient.detectIntent(request).catch(err => console.error(err));
	console.log("Detected intent");
	const result = responses[0].queryResult;
	console.log(`  Query: ${result.queryText}`);
	console.log(`  Response: ${result.fulfillmentText}`);
	if (result.intent) {
		console.log(`  Intent: ${result.intent.displayName}`);
		return result;
	}
	console.log(`  No intent matched.`);
	return false;
}