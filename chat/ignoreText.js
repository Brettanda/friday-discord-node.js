const fs = require("fs");
const textStart = fs.readFileSync("./ignoreChatsStartingWith.txt", "utf-8");
const text = fs.readFileSync("./ignoreChatsStartingWith.txt", "utf-8");
const textByLineStart = textStart.split("\n");
const textByLine = text.split("\n");

module.exports = msg => {
  textByLineStart.map((line, i) => {
    textByLineStart[i] = line.replace("\r", "");
  });
  textByLine.map((line, i) => {
    textByLine[i] = line.replace("\r", "");
  });
  // console.log(textByLineStart.filter(line => msg.content.startsWith(line)).length > 0, " ", textByLine.filter(line => msg.content.includes(line)).length > 0)
  return textByLineStart.filter(line => msg.cleanContent.startsWith(line)).length > 0 && textByLine.filter(line => msg.cleanContent.includes(line)).length > 0 ? true : false;
};
