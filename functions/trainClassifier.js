/**
 * Will add the phrases to the provided classifier under the given label.
 *
 * @param {Object} classifier
 * @param {String} label
 * @param {Array.String} phrases
 */
module.exports = (classifier, label, phrases) => {
  // console.info("Teaching set ", label, phrases);
  phrases.forEach(phrase => {
    // console.info(`Teaching single ${label}: ${phrase}`);
    classifier.addDocument(phrase.toLowerCase(), label);
  });
};
