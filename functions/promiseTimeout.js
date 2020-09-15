module.exports = (prom, ms = 5000) => {
  const timeout = new Promise((resolve, reject) => {
    const wait = setTimeout(() => {
      clearTimeout(wait);
      reject(`Timed out in ${ms}ms.`);
    }, ms);
  });

  return Promise.race([prom, timeout]);
};
