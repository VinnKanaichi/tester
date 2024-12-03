const fetch = require('node-fetch');

let handler = async (m, { hanz, text, usedPrefix, command }) => {
  if (!text) throw `Masukkan kata kunci untuk mencari gambar.\nContoh: ${usedPrefix + command} pohon`;

  m.reply('Mencari gambar...');

  try {
    let apiUrl = `https://api.agatz.xyz/api/gimage?message=${encodeURIComponent(text)}`;
    let res = await fetch(apiUrl);

    // Periksa status respons
    if (!res.ok) throw 'Gagal mengambil data dari API';

    let json = await res.json();
    console.log('API Response:', json); // Log respons dari API

    if (json.status !== 200 || !json.data || json.data.length === 0) {
      throw 'Gambar tidak ditemukan.';
    }

    // Mengambil gambar pertama dari hasil
    let image = json.data[0]; // Ambil objek gambar pertama
    let imageUrl = image.url; // URL gambar
    let imageHeight = image.height; // Tinggi gambar
    let imageWidth = image.width; // Lebar gambar

    await hanz.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: `Gambar tentang: ${text}\n\nTinggi: ${imageHeight}px\nLebar: ${imageWidth}px`
    }, { quoted: m });

  } catch (e) {
    m.reply(`Terjadi kesalahan: ${e.message || 'Kesalahan tidak terduga'}`);
  }
};

handler.help = ['gimage'];
handler.tags = ['internet'];
handler.command = /^gimage$/i;
handler.limit = false;

module.exports = handler;