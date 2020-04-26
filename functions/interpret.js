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
  console.info("interpret", phrase);
  const guesses = classifier.getClassifications(phrase);
  console.info("guesses", guesses);
  const guess = guesses.reduce((x, y) => (x && x.value > y.value ? x : y));
  return {
    probabilities: guesses,
    guess: guess.value > 0.7 ? guess.label : null
  };
};
