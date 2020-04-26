const fs = require("fs");

module.exports = filePath => {
  const trainingFile = fs.readFileSync(filePath);
  return JSON.parse(trainingFile);
};
