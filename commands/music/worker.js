const { parentPort } = require("worker_threads");

const ytdl = require("ytdl-core-discord");
// const scdl = require("soundcloud-downloader"); https://github.com/chrlew082/musicbot/blob/master/commands/play.js
const search = require("yt-search");

parentPort.on("message", type => {
  if (type == "play") {
    console.log(type);
  }
  parentPort.postMessage({ pong: type });
});
// parentPort.on('play', (msg,args,bot) => {
//   console.log(args);
//   parentPort.postMessage({ msg: msg.cleanContent })
// });
// parentPort.on('skip',
//     message => parentPort.postMessage({ pong: message }));
// parentPort.on('stop',
//     message => parentPort.postMessage({ pong: message }));
// parentPort.on('toggle',
//     message => parentPort.postMessage({ pong: message }));
// parentPort.on('queue',
//     message => parentPort.postMessage({ pong: message }));
