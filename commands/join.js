const Discord = require('discord.js');
const bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
const {
	entersState,
	VoiceConnectionStatus,
	joinVoiceChannel,
} = require('@discordjs/voice')

async function connectToChannel(channel) {
	const connection = joinVoiceChannel({
		channelId: channel.id,
		guildId: channel.guild.id,
		adapterCreator: channel.guild.voiceAdapterCreator,
	});
	try {
		await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
		return connection;
	} catch (error) {
        connectToChannel(channel)
		// connection.destroy();
		// throw error;
	}
}
module.exports = {
    name: 'join',
    description: "Joins the given voice channel",
    execute(msg, args) {
        const channel = msg.guild.channels.cache.get(args[0]);
        console.log(channel);
        console.log(args[0]);
        if (!channel) return console.error("The channel does not exist!");
        connectToChannel(channel)
    }
}