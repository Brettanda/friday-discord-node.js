const fs = require('fs');
const text = fs.readFileSync('./ignoreChatsStartingWith.txt','utf-8');
var textByLine = text.split("\n")

module.exports = msg => {
    textByLine.map((line,i) => {
        textByLine[i] = line.replace("\r","");
    });
    return textByLine.filter(line => msg.cleanContent.startsWith(line));
}