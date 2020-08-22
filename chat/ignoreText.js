const fs = require('fs');
const text = fs.readFileSync('./ignoreChatsStartingWith.txt','utf-8');
var textByLine = text.split("\r")

module.exports = msg => {
    textByLine.map((line,i) => {
        textByLine[i] = line.replace("\n","");
    });
    return textByLine.filter(line => msg.cleanContent.startsWith(line));
}