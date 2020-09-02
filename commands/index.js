module.exports = {
  Help: require("./help"),
  Ping: require("./ping"),
  Soup: require("./soupTime"),
  Say: require("./admin").say,
  Pizza: require("./pizzatime"),
  Issue: require("./issue"),
  Server: require("./serverInfo"),
  Info: require("./info"),
  Play: require("./music").play,
  Stop: require("./music").stop,
  Toggle: require("./music").toggle,
  Skip: require("./music").skip,
  Vote: require("./vote"),
  Meme: require("./meme"),
  Smile: require("./smile"),
  Icon: require("./admin").icon,
  React: require("./admin").react,
  Servers: require("./admin").servers,
  Dice: require("./diceRoll"),
  Inspiration: require("./inspiration"),
  // Music:  require('./music'),
};
