const fetch = require('node-fetch');

let handler = async (m, { hanz, text }) => {
  if (!text) throw 'Harap masukkan URL tweet.\nContoh : tweetdl https://twitter.com/Eminem/status/943590594491772928';

  try {
    // Mengambil data dari API
    let res = await fetch(`https://api.agatz.xyz/api/twitter?url=${encodeURIComponent(text)}`);
    let json = await res.json();

    // Memeriksa status respon dari API
    if (json.status !== 200 || !json.data) {
      throw 'Video tidak ditemukan atau terjadi kesalahan.';
    }

    // Mengambil data video dari API
    let desc = json.data.desc;
    let videoHdUrl = json.data.video_hd || json.data.video_sd; // Prioritaskan video HD, jika tidak ada, gunakan SD

    // Mengirimkan video
    await hanz.sendMessage(m.chat, {
      video: { url: videoHdUrl },
      caption: `Berikut adalah video dari tweet:\n\n${desc}`,
    });
  } catch (e) {
    // Menangani kesalahan dan mengirimkan pesan kesalahan
    await hanz.sendMessage(m.chat, `Terjadi kesalahan: ${e.message || e}`);
  }
};

// Menetapkan nama command dan tag
handler.command = ['twitterdl','tweetdl'];
handler.tags = ['downloader'];
handler.group = true

module.exports = handler;