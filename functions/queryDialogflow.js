const dialogflow = require('dialogflow').v2;
// /home/brett/personal/friday-discord-node.js/node_modules/dialogflow/src/index
module.exports = async (content,msg) => {	
	// const hrstart = process.hrtime();
	const sessionID = msg.channel.id ? msg.channel.id.toString() : msg.author.id.toString();//Math.random().toString();

	const config = { 
		credentials: { 
			private_key: process.env.PRIVATEKEY.split(/\\n/).join('\n'), 
			client_email: process.env.CLIENTEMAIL 
		} 
	} 

	const sessionClient = await new dialogflow.SessionsClient(config);
	const sessionPath = await sessionClient.sessionPath(process.env.DIALOGFLOWID,sessionID);

	const request = {
		session: sessionPath,
		queryInput: {
			text: {
				text: content,
				languageCode: 'en',
			}
		}
	};

	// const responses = 
	return sessionClient.detectIntent(request).then(res => {
		const result = res[0].queryResult;
		console.log(`Detected intent\n\t${result.intentDetectionConfidence}\n\tQuery: ${result.queryText}\n\tResponse: ${result.fulfillmentText}\n\t${result.intent ? 'Intent: '+result.intent.displayName : 'No intent matched'}`);
		// console.log(process.hrtime(hrstart)[1]/1000000000);
		if (result.intent) {
			// console.log(`  Intent: ${result.intent.displayName}`);
			return result;
		}
		// console.log(`  No intent matched.`);
		return false;
	}).catch(err => console.error(err));
	// console.log(`  Session ID: ${sessionID}`)
}