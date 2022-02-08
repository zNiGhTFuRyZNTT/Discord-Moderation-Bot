const fs = require('fs')

module.exports = (bot, Discord) => {
    const load_dir = (dirs) => {
        const component_files = fs.readdirSync(`./components/${dirs}`).filter(file => file.endsWith('.js'))

        for ( const file of component_files ) {
            const component = require(`../components/${dirs}/${file}`)
            const component_name = file.split('.')[0]
            bot.components.set(component_name, component)
            console.log(`|✅|-> Loaded Event ${component_name}.js`)
        }
    }
    ['media_mod'].forEach(e => load_dir(e))
    console.log(`\x1b[34m%s\x1b[0m`, `|${'='.repeat(35)}|`)


}