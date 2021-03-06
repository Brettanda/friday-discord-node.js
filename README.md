## This repo has been moved to [github.com/Brettanda/friday-discord-python](https://github.com/Brettanda/friday-discord-python)

<!--<div align="center">
<h1>Friday Discord Bot</h1>
<a href=""><img src="https://img.shields.io/npm/v/npm.svg?style=flat" alt="NPM Version"/></a>
<a href="https://github.com/Brettanda/friday-discord-node.js/blob/master/LICENSE.md"><img src="https://img.shields.io/github/license/Brettanda/friday-discord-node.js" alt="GitHub license"/></a>
<a href="https://github.com/Brettanda/friday-discord-node.js/issues"><img src="https://img.shields.io/github/issues/Brettanda/friday-discord-node.js" alt="GitHub issues"/></a>
<a href="https://discord.gg/NTRuFjU"><img src="https://img.shields.io/discord/707441352367013899?color=7289da&logo=discord&logoColor=white" alt="Discord Chat"/></a>
<a href="https://top.gg/bot/476303446547365891/vote"><img src="https://img.shields.io/badge/Vote-Friday-blue" alt="Vote"/></a>
<a href="https://discord.com/api/oauth2/authorize?client_id=476303446547365891&permissions=36792384&scope=bot"><img src="https://img.shields.io/badge/Add%20Friday-to%20your%20server-orange" alt="Add Friday to your server"/></a>
<a href="https://www.patreon.com/bePatron?u=34255235"><img src="https://img.shields.io/badge/-Become%20a%20Patron!-rgb(232%2C%2091%2C%2070)" alt="Become a Patron!"/></a>
</div>

## Privacy Disclaimer

Because this bot is using Dialogflow, Friday records all messages visible to itself and sends them to Dialogflow. Messages that Friday does not send include links and image embeds/links to images. The purpose of sending messages to Dialogflow is to train what Friday will respond to and what the reply would be. Sending messages to Dialogflow will be removed in the future once Friday's responses are more stable and accurate.

[Add Friday](https://discord.com/api/oauth2/authorize?client_id=476303446547365891&permissions=36792384&scope=bot) to your Discord server.

Hello, my name is Friday, I am a chatbot for the platform Discord. I like trying to be human and of course memes.

My goal is to make your Discord server feel more alive. I can do this by responding to chats like 'thanks Friday', 'hello' and if someone would like to make an insult towards me I can respond to that as well.

## Development

Make sure to add your bot token to the `.env` file or this won't be able to connect to anything.

## Commands

Another way to see the full list of commands is by typing `!help` in a Discord server that I have been invited to. You can also direct message me any commands as well (if you want to keep our conversation more private).

## D&D Dice rolling

Friday can also roll D&D dice for you with the command `!d` or `!r`. This command should work with everything on [wikipedia.org/wiki/Dice_notation](https://en.wikipedia.org/wiki/Dice_notation). If the command returns with an error please use the `!issue` command to explain what happened so I can fix the problem. A simple example of what this command can do is `!d d20` and a more complex example is `!r 3d20+d4*3`.

## Inspirational Quotes

If you ask Friday for an inspirational quote like `@Friday could you provide me an inspirational quote` Friday will build an image from a JavaScript Canvas with a background from a list and place a string of text from an array overtop of the image then send it as a message attachment

## Music

Friday can play music in a voice channel with the command `!play` followed by a search query or a YouTube video URL. Here are examples of those two uses `!play uptown funk` or `!play https://youtu.be/dQw4w9WgXcQ`.

## Chat

Friday can respond to normal chat without the message being directed towards Friday

### Context

Friday checks if a message is being directed towards Friday if the message contains a mention (`@Friday`), the word 'Friday' in capital letters or lowercase if the most recent message is from Friday, and Friday will (try) to respond to any message send through a direct message to Friday. If a phrase is said that Friday should respond to for a joke or something it will respond if it matches one of the 'no context' phrases. For example, if someone says 'Goodbye' with no context it will respond because goodbyes are apart of 'no context' and therefore can respond anyway.

## Privacy

Friday uses Googles Dialogflow which records all messages sent visible by Friday. As far as I can tell there is no easy way to remove message records from Dialogflow, but any messages will only be used to train the Friday Dialogflow Agent. If there is a conversation that you would like removed just message me with one of the messages from the conversation and I will remove it from Dialogflow.

Dialogflow does not take any information about the Discord guild except for any persons mentioned in a message and contents of a message. The channel id is used for the Dialogflow session-id for context and so Friday can respond to questions appropriately.

## Todo

- [ ] Auto-add intents or self-teaching ML
- [x] Add queue system for playing YouTube audio
- [x] Add D&D dice rolling command and dialogflow intent
- [ ] Make a modern-looking icon
- [ ] Add spam protection for the commands like `!issue`
- [ ] If a role is tagged that Friday is not apart of, ignore the message.
- [ ] When music is playing and someone sends a message there is a little bit of a lag spike that occurs in the audio. This needs to be fixed.
- [ ] Add some kind of server-specific settings
- [x] Add a search function to the `!play` command
- [ ] Friday will sometimes stop playing a video at some point and thinks that it still is playing
- [ ] Add the ability to play playlists from youtube as well as adding several

## To add to the dashboard

- [ ] Custom commands for sound clips to play in a voice channel
- [ ] Custom prefix setting for paying
-->
