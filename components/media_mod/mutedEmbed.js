const Discord = require('discord.js');
module.exports = (admin_id) => {
    const warn_msg = `🌹 کاربر گرامی 
    ⚠️ شما به دلیل ارسال محتوا غیر اخلاقی و به تصمیم ادمین: <@!${admin_id}> ،رول Muted دریافت کردید و در سرور محدود شدید 
    ❕لطفا برای رسیدگی به این موضوع به ادمین مربوطه پیام یا در چت Ticket یک تیکت باز کنید و موضوع رو مطرح کنید
    
    ✅ با تشکر، تیم دیسکورد کوئرا`
    const warn = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setURL('https://www.quera.org')
        .setAuthor({
            name: 'Quera',
            iconURL: 'https://cdn.discordapp.com/icons/872756724908560404/9e61fb1b71b94c421347c5ff7366bf0c.png?size=1024',
            url: 'https://www.quera.ir'
        })
        .addFields({
            name: `**اخطار**`,
            value: `${warn_msg}`,
        }, )
        .setTimestamp()
        .setFooter({
            text: 'Quera Discord Team',
            iconURL: 'https://cdn.discordapp.com/attachments/820259991955963945/920580334368731136/NEMESIS_TEAM_LOGO.jpg'
        })
        return warn
}