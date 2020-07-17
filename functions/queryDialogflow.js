const dialogflow = require('dialogflow').v2;
// /home/brett/personal/friday-discord-node.js/node_modules/dialogflow/src/index
module.exports = async (content,msg) => {	
	const sessionID = msg.channel.id ? msg.channel.id.toString() : msg.author.id.toString();//Math.random().toString();

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
	// console.log(`  Session ID: ${sessionID}`)
	const result = responses[0].queryResult;
	console.log(`Detected intent\n\t${result.intentDetectionConfidence}\n\tQuery: ${result.queryText}\n\tResponse: ${result.fulfillmentText}\n\t${result.intent ? 'Intent: '+result.intent.displayName : 'No intent matched'}`);
	if (result.intent) {
		// console.log(`  Intent: ${result.intent.displayName}`);
		return result;
	}
	// console.log(`  No intent matched.`);
	return false;
}