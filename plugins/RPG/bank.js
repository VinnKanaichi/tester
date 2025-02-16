const fs = require("fs")
let handler = async (m, { hanz,setReply }) => {
  let who =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
      ? conn.user.jid
      : m.sender;
  if (!(who in global.db.data.users))
    return m.reply(`User ${who} not in database`);
  let user = global.db.data.users[who];
  const caption = `
┌ • 『  *ʙᴀɴᴋ ᴄʜᴇᴄᴋ* 』
│ 👤 ɴᴀᴍᴇ: ${user.registered ? user.name : hanz.getName(m.sender)}
│ ${rpg.emoticon("atm")} ᴀᴛᴍ: ${user.atm > 0 ? "Level " + user.atm : "✖️"}
│ ${rpg.emoticon("bank")} sᴀʟᴅᴏ: ${user.bank} / ${user.fullatm}
│ ${rpg.emoticon("money")} ᴜᴀɴɢ: ${user.money}
│ ${rpg.emoticon("chip")} ᴄʜɪᴘ: ${user.chip}
│ 🤖 ʀᴏʙᴏ: ${user.robo > 0 ? "Level " + user.robo : "✖️"}
└────────────
`.trim();
  await setReply(caption)
};
handler.help = ["bank"];
handler.tags = ["rpg"];
handler.command = /^bank$/i;

handler.register = true;
handler.group = true;
handler.rpg = true;

module.exports = handler;
