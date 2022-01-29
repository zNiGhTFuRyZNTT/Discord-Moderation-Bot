const { getVoiceConnection } = require('@discordjs/voice')

module.exports = {
    name: 'leave',
    description: "Joins the given voice channel",
    execute(msg, args) {
        const connection = getVoiceConnection(msg.guild.id)

        if(!connection) return msg.channel.send("I'm not in a voice channel!")

        connection.destroy()
    }
}

