let handler = async (m, { setReply, hanz,command }) => {
  // Mengambil waktu aktif bot dari database
  let data1 = global.db.data.others['runtime'];
  let time1 = (new Date - data1.runtime) || 'lamanya'; // Menghitung durasi aktif bot
  
  // Mengatur pesan QR dan info donasi
  let qrnya = ' _Nih kakak Tinggal Scan Aja QR ini Dan Masukan Nominal Nya_';
  
  // URL dan Thumbnail gambar QR
  let qrImageUrl = 'https://pomf2.lain.la/f/wyig2tu9.jpg';
  
  await hanz.sendMessage(m.chat, {
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        title: `${global.botName}`,
        body: `Aktif selama ${clockString(time1)}`,
        previewType: "PHOTO",
        thumbnailUrl: `${getRandom(fotoRandom)}`, // Thumbnail gambar
        sourceUrl: web // URL tujuan
      }
    },
    image: { url: qrImageUrl }, // URL gambar QR
    caption: qrnya
  }, { quoted: m });

};

// Fungsi untuk mengonversi milidetik ke format waktu (jam, menit, detik)
function clockString(ms) {
  let hours = Math.floor(ms / 3600000);
  let minutes = Math.floor((ms % 3600000) / 60000);
  let seconds = Math.floor((ms % 60000) / 1000);
  return `${hours} jam, ${minutes} menit, ${seconds} detik`;
}

handler.help = ['qris', 'bayar', 'donasi']; // Perintah yang digunakan oleh pengguna
handler.tags = ['info']; // Kategori plugin
handler.command = /^(qris|bayar|donasi)$/i; // Regex untuk mencocokkan perintah

module.exports = handler;
