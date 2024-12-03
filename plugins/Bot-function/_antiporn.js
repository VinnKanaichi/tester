const axios = require('axios');
const {  Telegraph  } = require('../../lib/uploader.js')// Misalnya ada modul ini

let handler = (m) => m;

handler.before = async function (m, { hanz }) {
  const ownerNumber = [
    `${nomerOwner}@s.whatsapp.net`,
    
    `${hanz.user.jid}`,
  ];

  // ANTIPORN setReply
  const isAntiPorn = m.isGroup ? db.data.chats[m.chat].antiPorn : false;
  if (m.isGroup && isAntiPorn) {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';

    // Hanya memeriksa jika pesan adalah gambar
    if (/image/.test(mime)) {
      try {
        let media = await q.download(); // Mengunduh media
        let url = await Telegraph(media); // Upload ke penyimpanan sementara
        let api = `https://api.itsrose.life/image/nsfwCheck?url=${encodeURIComponent(url)}&apikey=Rk-Ashbornt&threshold=0.9`;

        let { data } = await axios.get(api);
        let status = data.status;
        if (status) {
          let isPorn = data.erotica >= 0.5 || data.sexual_display >= 0.5 || data.sexual_activity >= 0.5;

          if (isPorn) {
            if (m.isAdmin) return m.reply("Wah, karena admin jadi dimaafkan kali ini.");
            if (ownerNumber.includes(m.sender)) return m.reply("Pemilik bot tidak kena anti-porn.");

            // Menghapus pesan (delete)
            if (m.isBotAdmin) {
              await hanz.sendMessage(m.chat, { 
                delete: { 
                  remoteJid: m.chat, 
                  fromMe: false, 
                  id: m.key.id, 
                  participant: m.key.participant 
                } 
              });
            }
          }
        }
      } catch (e) {
        console.log(e);
        hanz.reply(m.chat, "Terjadi kesalahan dalam memproses gambar.", m);
      }
    }
  }
};

module.exports = handler;