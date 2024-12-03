const fetch = require('node-fetch');

let handler = async (m, { hanz, text }) => {
  if (!text) throw 'Harap masukkan URL Threads.';

  try {
    // Mengambil data dari API
    let res = await fetch(`https://api.agatz.xyz/api/threads?url=${encodeURIComponent(text)}`);
    let json = await res.json();

    // Memeriksa status respon dari API
    if (json.status !== 200 || !json.data) {
      throw 'Data tidak ditemukan atau terjadi kesalahan.';
    }

    // Mengambil data gambar dari API
    let data = json.data;
    let message = 'Berikut adalah konten dari Threads:\n\n';

    if (data.image_urls.length > 0) {
      message += 'Gambar:\n';
      for (let imgUrl of data.image_urls) {
        message += `${imgUrl}\n`; // Menambahkan URL gambar ke pesan
      }

      // Mengirim gambar pertama sebagai preview
      await hanz.sendMessage(m.chat, {
        image: { url: data.image_urls[0] }, // Menggunakan gambar pertama sebagai thumbnail
        caption: message,
      });
    } else {
      message += 'Tidak ada gambar yang ditemukan.';
      await hanz.sendMessage(m.chat, {
        text: message,
      });
    }

  } catch (e) {
    // Menangani kesalahan dan mengirimkan pesan kesalahan
    await hanz.sendMessage(m.chat, `Terjadi kesalahan: ${e.message || e}`);
  }
};

// Menetapkan nama command dan tag
handler.command = ['threads'];
handler.tags = ['downloader'];

module.exports = handler;