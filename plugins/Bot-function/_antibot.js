let handler = (m) => m;

handler.before = async function (m, { hanz }) {
 
  const isAntiBot = m.isGroup ? db.data.chats[m.chat].antibot : false;
  
  // ANTI BOT
  if (m.isGroup && isAntiBot) {
   
    if (m.isBaileys && !m.fromMe) {
    
      const isBotAdmin = await hanz.groupMetadata(m.chat).then(group => {
        const botNumber = hanz.user.jid;
        return group.participants.some(participant => participant.jid === botNumber && participant.admin);
      });

  
      if (!isBotAdmin) {
        return m.reply('Bot ini bukan admin, tidak bisa mengeluarkan bot lain.');
      } else {
  
        await m.reply(`*Another Bot Detected*\n\nHusshhh! Get away from this group!!!`);
        return await hanz.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      }
    }
  }
};

module.exports = handler;
