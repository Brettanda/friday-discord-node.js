module.exports = (msg,bot) => {
  const pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/; // fragment locator

  if (pattern.test(msg.cleanContent)) {
    console.log("url");
    msg.channel.messages.fetch({ limit: 1 }).then(async item => {
      // console.log(item.filter(item => item.cleanContent == msg.cleanContent));
      // console.log(msg.cleanContent)
      if(item.cleanContent == msg.cleanContent) {
        console.log("repost")
      }
    });
    return true;
  }
}