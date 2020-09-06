const {registerFont,createCanvas,loadImage} = require("canvas");
const func = require("../functions");

module.exports = {
  name: "inspiration",
  aliases: ["insp"],
  description: "Gives you an image with an inspirational quote",
  async execute(msg, args, bot) {
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
    const inspImages = [
      "https://cdn.discordapp.com/attachments/243945221086248961/750276288169771108/nur-bayraktepe-TBWYkMaDElk-unsplash_1.jpg",
      "https://cdn.discordapp.com/attachments/243945221086248961/750276629263286292/lynda-b-qCejnWFEs54-unsplash_2.jpg",
      "https://cdn.discordapp.com/attachments/243945221086248961/750434086908067880/veronica-reverse-diAIZW5IWBY-unsplash.jpg",
      "https://cdn.discordapp.com/attachments/243945221086248961/750434222405058580/racim-amr-8KKGTKmULU8-unsplash.jpg",
      "https://cdn.discordapp.com/attachments/243945221086248961/750434504962867240/george-howden-CxvpmTTlj2M-unsplash.jpg",
      "https://cdn.discordapp.com/attachments/243945221086248961/750435116202983484/solen-feyissa-g5CAJdzndhI-unsplash.jpg",
      "https://cdn.discordapp.com/attachments/243945221086248961/750435323812773998/waldemar-brandt-WX65IQ6BX18-unsplash.jpg",
    ];
    const sources = [
      "Photo by Nur Bayraktepe on Unsplash",
      "Photo by Lynda B on Unsplash",
      "Photo by Veronica Reverse on Unsplash",
      "Photo by Racim Amr on Unsplash",
      "Photo by George Howden on Unsplash",
      "Photo by Solen Feyissa on Unsplash",
      "Photo by Waldemar Brandt on Unsplash",
    ];

    const inspQuotes = [
      "Lechuga",
      "Manzana",
      "Peace",
      ":)",
      "Love, Laugh, Live",
      "GTFO",
      "If you are not first, you are last",
      "Have you eaten?",
      "@everyone",
      "@here",
      "Drink some water!",
      "Have you eaten yet today?",
      "If at first you don't succeed,\n then skydiving definitely\n isn't for you.",
      "People who wonder\nwhether the glass is\nhalf empty or half full\nare missing the point.\n\nThe glass is REFFILABLE!",
      "The elevator to success\nis out of order.\nYou'll need to use the stairs...\none step at a time.",
      "When nothing\ngoes right...\n\ngo left.",
      "When life gives\nyou lemons,\ngo outside and\ntake a walk",
      "When life gives\nyou lemons", //This was on purpose
      "When life has you down\nput on some lip chap",
      "Alt + F4\nis the solution to\nall of life's\nproblems",
      "E",
      "Empty the grease tray",
      "You are not insane",
      "Bruh",
    ];

    const text = inspQuotes[func.random(0, inspQuotes.length)];
    const imageNum = func.random(0, inspImages.length);
    const background = await loadImage(inspImages[imageNum]);
    const canvas = createCanvas(background.width / 2, background.height / 2);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    registerFont("./assets/font/Ubuntu-Regular.ttf",{family:"Ubuntu"})

    ctx.font = await applyText(canvas, text);
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(0,0,0,1)";
    ctx.shadowBlur = 4;
    // console.log((canvas.height / 1.8) - ((ctx.measureText(text).emHeightAscent+ctx.measureText(text).emHeightDescent) / 2));
    // console.log(canvas.height,"/ 1.8 - ", (ctx.measureText(text).emHeightAscent+ctx.measureText(text).emHeightDescent), " / 2")
    ctx.fillText(text, canvas.width / 2, canvas.height / 1.8 - (ctx.measureText(text).emHeightAscent + ctx.measureText(text).emHeightDescent) / 2);
    ctx.font = `10% Ubuntu`;
    ctx.fillText(sources[imageNum], canvas.width / 2, canvas.height - 50);

    const attachment = new MessageAttachment(canvas.toBuffer(), "inspiration.png");

    msg.channel.send(``, attachment);
  },
};
