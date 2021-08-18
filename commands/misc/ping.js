const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
          const msg = await message.channel.send("Pinging...");
      const Embed = new MessageEmbed()
        .setTitle("Pong!")
        .setAuthor(`${message.author.username}` , message.author.displayAvatarURL())
        .setDescription(
          `⌛ Latency is ${Math.floor(
            msg.createdTimestamp - message.createdTimestamp
          )}ms\n⏲️ API Ping is ${Math.round(client.ws.ping)}`
        )
        .setColor('#fb644c');
      message.channel.send(Embed);
      msg.delete();
      console.log(`${message.author.tag} has run the ping command, and we got ${Math.round(client.ws.ping)}!`)
    }

module.exports.help = {
    name: "ping"
}
