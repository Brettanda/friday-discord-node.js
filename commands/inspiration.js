const { registerFont, createCanvas, loadImage } = require("canvas");
const func = require("../functions");
const { inspImages, inspImageSources, inspImageQuotes } = require("../config.json");

module.exports = {
  name: "inspiration",
  aliases: ["insp"],
  description: "Gives you an image with an inspirational quote",
  async execute(msg) {
    const applyText = (canvas, text) => {
      const ctx = canvas.getContext("2d");

      // Declare a base size of the font
      let fontSize = 70;

      do {
        // Assign the font to the context and decrement it so it can be measured again
        ctx.textAlign = "center";
        ctx.font = `${(fontSize -= 10)}px Ubuntu`;
        // Compare pixel width of the text to the canvas minus the approximate avatar size
      } while (ctx.measureText(text).width > canvas.width - 200);

      // Return the result to use in the actual canvas
      return ctx.font;
    };
    const { MessageAttachment } = require("discord.js");

    const text = inspImageQuotes[func.random(0, inspImageQuotes.length)];
    const imageNum = func.random(0, inspImages.length);
    const background = await loadImage(inspImages[imageNum]);
    const canvas = createCanvas(background.width / 2, background.height / 2);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    registerFont("./assets/font/Ubuntu-Regular.ttf", { family: "Ubuntu" });

    ctx.font = await applyText(canvas, text);
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(0,0,0,1)";
    ctx.shadowBlur = 4;
    // console.log((canvas.height / 1.8) - ((ctx.measureText(text).emHeightAscent+ctx.measureText(text).emHeightDescent) / 2));
    // console.log(canvas.height,"/ 1.8 - ", (ctx.measureText(text).emHeightAscent+ctx.measureText(text).emHeightDescent), " / 2")
    ctx.fillText(text, canvas.width / 2, canvas.height / 1.8 - (ctx.measureText(text).emHeightAscent + ctx.measureText(text).emHeightDescent) / 2);
    ctx.font = "10% Ubuntu";
    ctx.fillText(inspImageSources[imageNum], canvas.width / 2, canvas.height - 50);

    const attachment = new MessageAttachment(canvas.toBuffer(), "inspiration.png");

    msg.channel.send("", attachment);
  },
};
