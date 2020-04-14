const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require('fs');

module.exports = {
  name: "play",
  execute(msg,args) {
    if (msg.member.voice.channel) {
      const connection = msg.member.voice.channel.join();
      
      connection.play("https://cdn.glitch.com/2bc000cf-e82b-4d7d-815b-e1ba4350bf59%2FYoda%20goes%20to%20steal%20Luke's%20ketamine.mp3?v=1586857736240");

      connection.on('start', () => {
        console.log('audio.mp3 is now playing!');
      });

      connection.on('finish', () => {
        console.log('audio.mp3 has finished playing!');
      });

      // Always remember to handle errors appropriately!
      connection.on('error', console.error);
    }
    
  }
}