const DBL = require("dblapi.js");

module.exports = (bot) => {
  const dbl = new DBL(process.env.TOCKENDBL, bot);

  dbl.on("posted", () => {
    console.log("Server count posted");
  });

  dbl.on("error", (e) => {
    console.error(`Oops! ${e}`);
  });
};
