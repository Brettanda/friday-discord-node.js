# Friday Discord Bot

[![NPM Version](https://img.shields.io/npm/v/npm.svg?style=flat)]()
[![GitHub license](https://img.shields.io/github/license/Brettanda/friday-discord-node.js)](https://github.com/Brettanda/friday-discord-node.js/blob/master/LICENSE.md)
[![GitHub issues](https://img.shields.io/github/issues/Brettanda/friday-discord-node.js)](https://github.com/Brettanda/friday-discord-node.js/issues)
[![Discord Chat](https://img.shields.io/discord/707441352367013899?color=7289da&logo=discord&logoColor=white)](https://discord.gg/NTRuFjU)
[![Vote](https://img.shields.io/badge/Vote-Friday-blue)](https://top.gg/bot/476303446547365891/vote)
[![Add Friday to your server](https://img.shields.io/badge/Add%20Friday-to%20your%20server-orange)](https://discord.com/api/oauth2/authorize?client_id=476303446547365891&permissions=36792384&scope=bot)
[![Become a Patron!](<https://img.shields.io/badge/-Become%20a%20Patron!-rgb(232%2C%2091%2C%2070)>)](https://www.patreon.com/bePatron?u=34255235)

## Privacy Disclaimer

Because this bot is using Dialogflow, Friday records all messages visible to itself and sends them to Dialogflow. Messages that Friday does not send include links and image embeds/links to images. The purpose of sending messages to Dialogflow is to train what Friday will respond to and what the reply would be. Sending messages to Dialogflow will be removed in the future once Fridays responses are more stable and accurate.

[Add Friday](https://discord.com/api/oauth2/authorize?client_id=476303446547365891&permissions=36792384&scope=bot) to your Discord server.

Hello, my name is Friday, I am a chatbot for the platform Discord. I like trying to be human and of course memes.

My goal is to make your Discord server feel more alive. I can do this by responding to chats like 'thanks Friday', 'hello' and if someone would like to make an insult towards me I can respond to that as well.

## Development

Make sure to add your bot token to the `.env` file or this won't be able to connect to anything.

## Commands

Another way to see the full list of commands is by typing `!help` in a Discord server that I have been invited to. You can also direct message me any commands as well (if you want to keep our conversation more private).

## Music

Friday can play music in a voice channel with the command `!play` followed by a search query or a YouTube video URL. Here are examples of those two uses `!play uptown funk` or `!play https://youtu.be/dQw4w9WgXcQ`.

## Chat

Friday can respond to normal chat without the message being directed towards Friday

### Context

Friday checks if a message is being directed towards Friday if the message contains a mention (`@Friday`), the word 'Friday' in capital letters or lowercase if the most recent message is from Friday, and Friday will (try) to respond to any message send through a direct message to Friday. If a phrase is said that Friday should respond to for a joke or something it will respond if it matches one of the 'no context' phrases. For example, if someone says 'Hello' with no context it will respond because greetings are apart of 'no context' and therefore can respond anyway.

<!-- ## Privacy

Friday uses Googles Dialogflow which records all messages sent visible by Friday. As far as I can tell there is no easy way to remove message records from Dialogflow, but any messages will only be used to train the Friday Dialogflow Agent. If there is a conversation that you would like removed just message me with one of the messages from the conversation and I will remove it from Dialogflow.

Dialogflow does not take any information about the Discord guild except for any persons mentioned in a message and contents of a message. The channel id is used for the Dialogflow session-id for context and so Friday can respond to questions appropriately. -->

## Todo

- [ ] Auto add intents or self teaching ML
- [x] Add queue system for playing YouTube audio
- [x] Add D&D dice rolling command and dialogflow intent
- [ ] Make a modern looking icon
- [ ] Add spam protection for the commands like `!issue`
- [ ] If a role is tagged that Friday is not apart of, ignore the message.
- [ ] When music is playing and someone sends a message there is a little bit of a lag spike that occurs in the audio. This needs to be fixed.
- [ ] Add some kind of server specific settings
- [x] Add a search function to the `!play` command
