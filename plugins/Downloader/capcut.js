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

let handler = async (m, { hanz, text, usedPrefix, command }) => {
  if (!text) throw `Masukkan URL CapCut.\nContoh: ${usedPrefix + command} https://www.capcut.com/t/Zs8MPAKjG/`;

  m.reply('Mencari video...');

  try {
    let apiUrl = `https://api.agatz.xyz/api/capcut?url=${encodeURIComponent(text)}`;
    let res = await fetch(apiUrl);

    // Periksa status respons
    if (!res.ok) throw 'Gagal mengambil data dari API';

    let json = await res.json();
    console.log('API Response:', json); // Log respons dari API

    if (json.status !== 200 || !json.data.status) throw 'Gagal mengambil data dari API';

    // Mengambil URL video dari respons
    let videoUrl = json.data.url; 
    console.log('Video URL:', videoUrl); // Log URL video untuk debug
    if (!videoUrl) throw 'Link video tidak ditemukan.';

    let caption = `*Judul:* ${json.data.title || 'Tidak ada judul'}\n` +
                  `*Ukuran:* ${json.data.size || 'Tidak ada ukuran'}\n` +
                  `*Link Video:* [Tonton di CapCut](${text})\n` +
                  `*Link Unduh Video:* [Unduh](${videoUrl})`;

    // Mengirimkan video
    await hanz.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: caption,
      mimetype: 'video/mp4'
    }, { quoted: m });

  } catch (e) {
    console.error(e); // Log kesalahan untuk debugging
    m.reply(`Terjadi kesalahan: ${e.message || 'Kesalahan tidak terduga'}`);
  }
};

handler.help = ['capcutdl'];
handler.tags = ['downloader'];
handler.command = /^capcutdl$/i;
handler.limit = false;

module.exports = handler;