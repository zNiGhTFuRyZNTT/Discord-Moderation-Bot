const Discord = require('discord.js');
const bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

module.exports = async (channel, author_id, media_url, choices_btns) => {
    const Embed = new Discord.MessageEmbed()
	.setColor('#FF0000')
	.setTitle(`Media Log`)
	.setDescription(`<@!${author_id}>`)
	.setThumbnail('https://cdn.discordapp.com/attachments/813485505697021962/937209895835553852/il_340x270.3232201870_ne8h.jpg')
	.addFields(
		{ name: 'Regular field title', value: `By <@!${author_id}>` },
		{ name: '\u200B', value: '\u200B' },
	)
	.setImage(`${media_url}`)
	.setTimestamp()
	.setFooter({text: 'Discord Moderation by NiGhTFuRy', iconURL: 'https://cdn.discordapp.com/attachments/813485505697021962/937208081446760508/photo_2020-12-08_17-26-49.jpg'});

    channel.send({ content:`<@!${author_id}>`, embeds: [Embed], components: [choices_btns]})
}