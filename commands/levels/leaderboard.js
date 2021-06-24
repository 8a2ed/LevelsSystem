const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Levels = require('discord-xp');

module.exports = {
    name: 'leaderboard',
    aliases: ['leaders'],
    description: '',
    usage: 'leaderboard',
    timeout: 00,
    nsfw: false,
    admin: false,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10);

        if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);

        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`);

        message.channel.send(`**Leaderboard**:\n\n${lb.join("\n\n")}`);
    }
}