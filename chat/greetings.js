const {greetings} = require("../config.json");

module.exports = function(msg) {
  if(msg.content.includes("hello")) {
    msg.reply("hey");
  }
}