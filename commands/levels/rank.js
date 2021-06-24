const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Levels = require('discord-xp');

module.exports = {
    name: 'rank',
    aliases: [''],
    description: '',
    usage: 'rank <@user>',
    timeout: 00,
    nsfw: false,
    admin: false,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const target = message.mentions.users.first() || message.author;

        if(target.id == client.user.id) return

        if(target.bot) return

        const user = await Levels.fetch(target.id, message.guild.id);

        if (!user) return message.channel.send("This user has not earned any xp so far.");

        message.channel.send(`${target.username}, is currently level \`${user.level}\` and \`${user.xp}\`xp.`);
    }
}