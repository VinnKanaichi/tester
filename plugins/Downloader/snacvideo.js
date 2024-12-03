/* 
  ────────「 *RANGELOFFICIAL* 」──────── 
  Powered by *EhanzDhoanx* × *MENHERA MD* 
  Copyright © Raihan Fadillah 
  Instagram: @ehanzdhonax 

  ⚠️ *Jangan hapus watermark ini!* 
  Dukunganmu sangat berarti untuk kami! 
  ──────────────────────────────── 
*/


const fetch = require('node-fetch');

let handler = async (m, { hanz, text }) => {
  if (!text) throw 'Harap masukkan URL SnackVideo!';

  m.reply('Mencari video...');

  try {
    let res = await fetch(`https://api.agatz.xyz/api/snackvideodl?url=${encodeURIComponent(text)}`);
    let json = await res.json();

    if (json.status !== 200) throw 'Gagal mengambil data dari API';

    let { title, thumbnail, media, author, like, comment, share } = json.data;
    let caption = `*Judul:* ${title}\n*Dari:* ${author}\n*Like:* ${like}\n*Komentar:* ${comment}\n*Bagikan:* ${share}\n*Thumbnail:* ${thumbnail}`;

    await hanz.sendMessage(m.chat, {
      video: { url: media },
      caption: caption,
    }, { quoted: m });

  } catch (e) {
    m.reply(`Terjadi kesalahan: ${e.message}`);
  }
};

handler.command = handler.help = ['snackvideo'];
handler.tags = ['downloader'];
handler.limit = false;
handler.premium = true;

module.exports = handler;