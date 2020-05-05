const dialogflow = require('dialogflow');

module.exports = async (content,msg) => {	
	const sessionID = msg.author.id.toString();//Math.random().toString();

	let config = { 
		credentials: { 
			private_key: process.env.PRIVATEKEY.split(/\\n/).join('\n'), 
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
				languageCode: 'en',
			}
		}
	};

	const responses = await sessionClient.detectIntent(request).catch(err => console.error(err));
	console.log("Detected intent");
	console.log(`  Session ID: ${sessionID}`)
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