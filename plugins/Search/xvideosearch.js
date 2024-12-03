const fetch = require('node-fetch');

let handler = async (m, { hanz, text }) => {
  if (!text) throw 'Harap masukkan kata kunci untuk pencarian video.';

  try {
    // Mengambil data dari API
    let res = await fetch(`https://api.agatz.xyz/api/xvideo?message=${encodeURIComponent(text)}`);
    let json = await res.json();

    // Memeriksa status respon dari API
    if (json.status !== 200 || !json.data || json.data.length === 0) {
      throw 'Tidak ada video ditemukan untuk kata kunci ini.';
    }

    // Mengambil daftar video dari API
    let videos = json.data;
    let message = `Hasil pencarian video untuk *"${text}"*:\n`;

    // Menyusun pesan dengan informasi video
    videos.forEach(video => {
      message += `- Judul: ${video.title || 'Tidak ada judul'}\n` +
                 `  Durasi: ${video.duration || 'Tidak ada durasi'}\n` +
                 `  URL: ${video.url || 'Tidak ada URL'}\n` +
                 `  Thumbnail: ${video.thumb || 'Tidak ada thumbnail'}\n\n`;
    });

    // Mengirim pesan dengan daftar video
    await hanz.sendMessage(m.chat, {
      text: message,
    });

  } catch (e) {
    // Menangani kesalahan dan mengirimkan pesan kesalahan
    await hanz.sendMessage(m.chat, `Terjadi kesalahan: ${e.message || e}`);
  }
};

// Menetapkan nama command dan tag
handler.command = ['xvideosearch'];
handler.tags = ['video'];

module.exports = handler;