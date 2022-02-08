require('dotenv').config();
const { isAdmin, rmAdmin } = require('../database/database');
const MAIN_ADMIN_ID = (process.env.MAIN_ADMIN_ID.length > 0) ? process.env.MAIN_ADMIN_ID : null

module.exports = {
    name: 'rmadmin',
    description: "Removes an admin from database",
    async execute(msg, args, bot = null) {

        const is_auth = await isAdmin(Number(msg.author.id))
        const is_admin = (msg.author.id === MAIN_ADMIN_ID) || is_auth ? true : false
        if (!is_admin) {
            msg.reply("[!] You are not authorized as Admin")
            return
        }

        const uid = args[0]
        const res = await rmAdmin(Number(uid))
        if (res)
            msg.reply(`\`\`\`css\n @user with id: \`${uid}\` removed from Admins. \n\`\`\``)
        else
            msg.reply(`\`\`\`css\n |❌| No Such Admin \n\`\`\``)

    }
}