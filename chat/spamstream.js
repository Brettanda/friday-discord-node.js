module.exports = async (msg, content) => {
  await msg.channel.messages
    .fetch({ limit: 10 })
    .then((item) => {
      console.log("item");
    })
    .catch((err) => console.error(err));
};
