const fs = require('fs');
const { addSpam, cekSpam } = require('../../lib/antispam');

let handler = (m) => m;

handler.before = async function (m, { hanz }) {
    const AntiSpam = db.data.antispam;
    
    if (db.data.sticker[m.budy]) {
        
        if (cekSpam("NotCase", m.senderNumber, AntiSpam)) return;

      
        addSpam("NotCase", m.senderNumber, "5s", AntiSpam);

       
        await hanz.sendMessage(m.chat, { 
            sticker: { url: db.data.sticker[m.budy].link }
        }, { quoted: m });
    }
};

module.exports = handler;
