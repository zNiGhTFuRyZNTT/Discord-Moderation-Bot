const fs = require('fs')

module.exports = (bot, Discord) => {
    const commandFiles = fs.readdirSync('./functions/').filter(file => file.endsWith('.js'))
    for (const file of commandFiles) {
        const func = require(`../functions/${file}`)
        const func_name = file.split('.')[0]
        if (func_name) {
            bot.functions.set(func_name, func)
            console.log(`|✅|-> Loaded Function ${func_name}.js`)
        } 
        else
            continue
    }
    console.log(`\x1b[34m%s\x1b[0m`, `|${'='.repeat(35)}|`)

}