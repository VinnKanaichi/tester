let handler = (m) => m;

handler.before = async function (m, { hanz, isPremium, isOwner, chatUpdate }) {
  // AUTO READ & REACT SW
    if (m.key.remoteJid == "status@broadcast") return hanz.sendMessage(m.key.remoteJid, { react: { text: '😹', key:  m.key } }, { statusJidList: [m.key.participant, m.sender] }).catch(() => {
        false
        });
};
module.exports = handler;