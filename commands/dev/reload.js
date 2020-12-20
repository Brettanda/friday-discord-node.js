module.exports = {
  name: "reload",
  owner: true,
  hidden: true,
  execute(msg, args) {
    if (!args.length) return msg.channel.send("State a command to reload");

    const commandName = args[0].toLowerCase();
    const command = msg.client.commands.get(commandName) || msg.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return msg.channel.send(`There is no command with name or alias \`${commandName}\`, ${msg.author}!`);

    delete require.cache[require.resolve(`./${command.name}.js`)];

    try {
      const newCommand = require(`./${command.name}.js`);
      msg.client.commands.set(newCommand.name, newCommand);
      msg.channel.send(`Command \`${command.name}\` was reloaded!`);
    } catch (error) {
      console.log(error);
      msg.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
    }
  },
};
