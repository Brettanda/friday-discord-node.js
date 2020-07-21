# Friday Discord Bot

## Disclaimer

Because this bot is using Dialogflow, Friday records all messages visible to itself and sends them to Dialogflow. Messages that Friday does not send include links and image embeds/links to images. The purpose of sending messages to Dialogflow is to train what Friday will respond to and what the reply would be. Sending messages to Dialogflow will be removed in the future once Fridays responses are more stable and accurate.

[Add Friday](https://discord.com/api/oauth2/authorize?client_id=476303446547365891&permissions=36792384&scope=bot) to your Discord server.

Hello, my name is Friday, I am a chatbot for the platform Discord. I like trying to be human and of course memes.

My goal is to make your Discord server feel more alive. I can do this by responding to chats like 'thanks Friday', 'hello' and if someone would like to make an insult towards me I can respond to that as well.

## Development

Make sure to add your bot token to the `.env` file or this won't be able to connect to anything.

## Commands

Another way to see the full list of commands is by typing `!help` in a Discord server that I have been invited to. You can also direct message me any commands as well (if you want to keep our conversation more private).

## Chat

Friday can respond to normal chat without the message being directed towards Friday

### Context

Friday checks if a message is being directed towards Friday if the message contains a mention (`@Friday`), the word 'Friday' in capital letters or lowercase if the most recent message is from Friday, and Friday will (try) to respond to any message send through a direct message to Friday. If a phrase is said that Friday should respond to for a joke or something it will respond if it matches one of the 'no context' phrases. For example, if someone says 'Hello' with no context it will respond because greetings are apart of 'no context' and therefore can respond anyway.

<!-- ## Privacy

Friday uses Googles Dialogflow which records all messages sent visible by Friday. As far as I can tell there is no easy way to remove message records from Dialogflow, but any messages will only be used to train the Friday Dialogflow Agent. If there is a conversation that you would like removed just message me with one of the messages from the conversation and I will remove it from Dialogflow.

Dialogflow does not take any information about the Discord guild except for any persons mentioned in a message and contents of a message. The channel id is used for the Dialogflow session-id for context and so Friday can respond to questions appropriately. -->

## Todo

- [ ] Auto add intents or self teaching ML
- [ ] Add queue system for playing YouTube audio
- [ ] Add D&D dice rolling command and dialogflow intent
- [ ] Make a modern looking icon
