require('dotenv').config();
const { isAdmin, addAdmin } = require('../database/database');
const ADMIN_CHAT_ID = (process.env.ADMIN_CHAT_ID.length > 0) ? process.env.ADMIN_CHAT_ID : null
const MAIN_ADMIN_ID = (process.env.MAIN_ADMIN_ID.length > 0) ? process.env.MAIN_ADMIN_ID : null


module.exports = {
    name: 'addadmin',
    description: "add a new admin to the database",
    async execute(msg, args, bot = null) {
        const msg_author = msg.author.id
        const is_auth = await isAdmin(Number(msg_author))
        const is_admin = (msg_author === MAIN_ADMIN_ID) || is_auth ? true : false
        const is_main = (msg_author === MAIN_ADMIN_ID)
        
        if (!is_main) {
            if (is_admin) {
              msg.reply("[!] You are not authorized as Main, this incident will be reported.")
              await bot.users.fetch(MAIN_ADMIN_ID)
              .then((owner) => {
                owner.send(`Admin <@${msg_author}> with id= \`${msg_author}\` in server=\`${guild.name}\` Tried to add Admin. `)
              })
              .catch((err) => {
                bot.channels.cache.get(ADMIN_CHAT_ID).send(err.message)
              })
            } else
              msg.reply("[!] You are not authorized as Owner")
            return
          }
          const uid = args[0]
          // admins.push(uid)
          addAdmin(Number(uid))
          msg.reply(`\`\`\`css\n @user with id: \`${uid}\` added as Admin. \n\`\`\``)
    }
}