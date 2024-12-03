let handler = async (m, { hanz, text, usedPrefix, command }) => {
  const globalNomerOwner = '628388198229'; // Nomor owner

  const ownerName = 'ᴠɪɴɴ ᴋᴀɴᴀɪᴄʜɪ'; // Nama owner
  const botName = 'ᴠɪɴɴ ᴋᴀɴᴀɪᴄʜɪ'; // Nama bot
  const sender = m.sender;

  const p = `${global.nomerOwner || globalNomerOwner}`;
  let who = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.fromMe
    ? hanz.user.jid
    : sender;

  let pp = await hanz.profilePictureUrl(who).catch(() => 
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
  );

  let vcard = `
BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:${ownerName}
item.ORG:✍️ Masih Belajar Bwang Jangan Dibully
item1.TEL;waid=${p}:${p}
item1.X-ABLabel:📞 Nomor Owner
item2.EMAIL;type=INTERNET:yaemikomd@gmail.com
item2.X-ABLabel:📧 Email
item3.ADR:;; Tasikmalaya;;;;
item3.X-ABADR:ac
item3.X-ABLabel:📍 Region
item4.URL:https://github.com/VinnKanaichi
item4.X-ABLabel:🌐 Website
item5.X-ABLabel:🌐 ʏᴀᴇᴍɪᴋᴏ - ᴍᴅ
END:VCARD`.trim();

  // Kirim kontak owner
  await hanz.sendMessage(m.chat, {
    contacts: {
      displayName: ownerName,
      contacts: [{ vcard }]
    },
    contextInfo: {
      externalAdReply: {
        title: botName,
        body: `🌐 ʏᴀᴇᴍɪᴋᴏ - ᴍᴅ 🎗️ ᴍᴀᴅᴇ ʙʏ ᴠɪɴɴᴋᴀɴᴀɪᴄʜɪ`,
        thumbnailUrl: 'https://pomf2.lain.la/f/4ood5css.jpg',
        sourceUrl: null,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });

  // Kirim pesan tambahan
  let message = `🌟 ʜᴀɪ ᴋᴀᴋ @${sender.split("@")[0]}! 🌟
ᴘᴇʀᴋᴇɴᴀʟᴋᴀɴ, ɪɴɪ ᴀᴅᴀʟᴀʜ ᴏᴡɴᴇʀ-ᴋᴜ! ᴅɪᴀ ꜱᴇᴅᴀɴɢ ᴅᴀʟᴀᴍ ᴘᴇʀᴊᴀʟᴀɴᴀɴ ʙᴇʟᴀᴊᴀʀ ᴜɴᴛᴜᴋ ᴍᴇɴᴊᴀᴅɪ ʏᴀɴɢ ᴛᴇʀʙᴀɪᴋ ᴅᴀʟᴀᴍ ʙɪᴅᴀɴɢ ɪɴɪ. ᴊɪᴋᴀ ᴀᴅᴀ ʏᴀɴɢ ɪɴɢɪɴ ᴋᴀᴍᴜ ᴛᴀɴʏᴀᴋᴀɴ ᴀᴛᴀᴜ ʙᴜᴛᴜʜ ʙᴀɴᴛᴜᴀɴ, ᴊᴀɴɢᴀɴ ʀᴀɢᴜ ᴜɴᴛᴜᴋ ᴍᴇɴɢʜᴜʙᴜɴɢɪɴʏᴀ!  ɪɴɢᴀᴛ, ʟᴇʙɪʜ ʙᴀɪᴋ ᴍᴇᴍɪʟɪᴋɪ ꜱᴇᴅɪᴋɪᴛ ᴛᴇᴍᴀɴ ʏᴀɴɢ ᴅᴀᴘᴀᴛ ᴍᴇᴍʙᴀɴᴛᴜᴍᴜ ᴅᴀʀɪᴘᴀᴅᴀ ʙᴀɴʏᴀᴋ ᴛᴇᴍᴀɴ ʏᴀɴɢ ʜᴀɴʏᴀ ᴍᴇɴᴄᴀʀɪ ᴋᴇᴛᴇɴᴀʀᴀɴ. ᴍᴀʀɪ ᴋɪᴛᴀ ᴛᴜᴍʙᴜʜ ʙᴇʀꜱᴀᴍᴀ ᴅᴀɴ ꜱᴀʟɪɴɢ ᴍᴇɴᴅᴜᴋᴜɴɢ! 💪✨`;
  
  hanz.reply(m.chat, message, m, {
    mentions: [sender]
  });
};

handler.help = ['owner', 'creator'];
handler.tags = ['info'];
handler.command = /^(owner|creator)$/i;

module.exports = handler;
