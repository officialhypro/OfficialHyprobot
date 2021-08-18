const punishModel = require('../../schemas/punishment');
const Discord = require('discord.js');
const emoji = require('../../configure/emojis.json');

module.exports.run = async (client, message, args) => {

    const mentionedMember = message.mentions.members.first()
        || message.guild.members.cache.get(args[0])

    if (!message.member.hasPermission('KICK_MEMBERS') { // reason why I picked Kick Members is because so trainee mods can warn 
        return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${emoji.denied} You don\'t have permission to warn members!`)
            .setColor('#F96950')
    }
    else if (!mentionedMember) {
        return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${emoji.warn} You need to mention a member you want to warn.`)
            .setColor('#F9A750')
    }

    const mentionedPotision = mentionedMember.roles.highest.position
    const memberPotision = message.member.roles.highest.position

    if (memberPotision <= mentionedPotision) {
        return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${emoji.noentry} You can\'t warn this member as their role is higher to yours.`)
            .setColor('#F96950')
    }

    const reason = args.slice(1).join(' ') || 'No reason specified.'

  const punishID = Math.floor(Math.random() * 9999999999 - 1111111111) + 1111111111
  
  await new punishModel({
	guildID: message.guild.id,
    memberID: mentionedMember.id,
    punishID,
    type: "warn",
    moderatorId: message.author.id,
    reason,
    date: Date.now(),
  }).save()

        mentionedMember.send(new Discord.MessageEmbed()
        .setTitle(`You've been warned on ${message.guild.name}!`)
        .addField("Action", "Warn")
        .addField("Reason", `${reason ? `${reason}` : ''}`)
        .addField("Punishment ID", `${punishID}`)
        .setTimestamp(message.createdAt)
        .setColor('#F9A750')
                             
                             
    message.channel.send(new Discord.MessageEmbed()
        .setDescription(`Sucessfully warned ${mentionedMember} | ${punishID} `)
        .setTimestamp(message.createdAt)
        .setColor('#F9A750')
    
      console.log(`Moderator ${message.author.tag} has warned the ID of ${mentionedMember} with punishment ID of ${punishID}`)

}

module.exports.help = {
    name: "warn"
}
