/**
 * Uses the trained classifier to give a prediction of what
 * labels the provided pharse belongs to with a confidence
 * value associated with each and a a guess of what the actual
 * label should be based on the minConfidence threshold.
 *
 * @param {String} phrase
 *
 * @returns {Object}
 */
module.exports = (phrase, classifier) => {
  console.log("interpret", phrase);
  // console.log(classifier.getClassifications(phrase.toLowerCase()));
  const guesses = classifier.getClassifications(phrase.toLowerCase());
  console.log("guesses", guesses);
  const guess = guesses.reduce((x, y) => (x && x.value > y.value ? x : y));
  return {
    probabilities: guesses,
    guess: guess.value > 0.7 ? guess.label : null
  };
};
