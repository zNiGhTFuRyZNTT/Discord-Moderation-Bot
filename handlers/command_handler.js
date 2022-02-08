const fs = require('fs')

module.exports = (bot, Discord) => {
    console.log(`\x1b[34m%s\x1b[0m`, `|${'='.repeat(35)}|`)
    const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
    for (const file of commandFiles) {
        const command = require(`../commands/${file}`)
        if (command.name) {
            bot.commands.set(command.name, command)
            console.log(`|✅|-> Loaded Command ${command.name}.js`)
        }
        else
            continue
    }
    console.log(`\x1b[34m%s\x1b[0m`, `|${'='.repeat(35)}|`)

}

