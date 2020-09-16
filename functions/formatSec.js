module.exports = totalSeconds => {
  const h = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const min = Math.floor(totalSeconds / 60);
  const sec = totalSeconds % 60;

  return `${h ? `${h < 10 ? "0" : ""}${h}:` : ""}${min ? `${min < 10 ? "0" : ""}${min}:` : ""}${sec < 10 ? "0" : ""}${sec}`;
};
