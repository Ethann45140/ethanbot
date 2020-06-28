const Discord = require('discord.js')
const client = new Discord.Client()
let prefix = "e!"
 
client.on("ready", () => {
    console.log(`Bonjour, ${client.user.username} je suis en ligne !`);

    client.user.setPresence({
        status: "online",
        game: {
            name: " e!help | Maintenance",
            type: "WATCHING"
        }
    }); 
})

client.on('message', function (message) {
    if (message.content === "maintenance") {
        message.channel.sendMessage('Je suis en maintenance pour le moment :cry:')
        console.log('répond maintenance')
    }
})

client.on('guildMemberAdd', function (member) {
    let embed = new Discord.RichEmbed()
        .setDescription(':tada: **' + member.user.username + '** a rejoint ' + member.guild.name)
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
    member.guild.channels.get('626407991192584202').send(embed)
    member.addRole('626411531600396299')
})
 
client.on('guildMemberRemove', function (member) {
    let embed = new Discord.RichEmbed()
        .setDescription(':cry: **' + member.user.username + '** a quitté ' + member.guild.name)
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
    member.guild.channels.get('626407991192584202').send(embed)
})

client.on('message',message => {
    if (!message.guild) return 
    let args = message.content.trim().split(/ +/g)

   if (args[0].toLowerCase() === prefix + 'kick'){
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Vous n'avez pas la permisssion de utiliser la commande ! ;(")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cet utilisateur :x:")
        if (!member.kickable) return message.channel.send("Je ne peut pas exclure cet utilisateur :cry:")
        member.kick()
        message.channel.send(member.user.username + ' à été bien exclu :white_check_mark:')
    }
});

client.on('message',message => {
    if (!message.guild) return 
    let args = message.content.trim().split(/ +/g)

   if (args[0].toLowerCase() === prefix + 'ban'){
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous n'avez pas la permisssion de utiliser la commande ! ;(")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur :x:")
        if (!member.bannable) return message.channel.send("Je ne peut pas bannir cet utilisateur :cry:")
        member.guild.ban(member, {days: 7})
        message.channel.send(member.user.username + ' à été bien banni :white_check_mark:')
    }
});

client.on('message',message => {
    if (!message.guild) return 
    let args = message.content.trim().split(/ +/g)

   if (args[0].toLowerCase() === prefix + 'warn'){
        if (!message.member.hasPermission('WARN_MEMBERS')) return message.channel.send("Vous n'avez pas la permisssion de utiliser la commande ! ;(")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas warn cet utilisateur :x:")
        if (!member.warnable) return message.channel.send("Je ne peut pas warn cet utilisateur :cry:")
        member.warn()
        message.channel.send(member.user.username + ' à bien reçu le warn :white_check_mark:')
    }
})

client.login(process.env.TOKEN);