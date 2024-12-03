const axios = require('axios');

let handler = async (m, { q, hanz }) => {
  if (!q) {
    return m.reply("Silakan berikan link lagu Spotify yang ingin diunduh.");
  }

  try {
    // Mengirim permintaan ke API untuk mendapatkan data lagu
    const apiUrl = `https://rest.cifumo.biz.id/api/downloader/spotify-dl?url=${encodeURIComponent(q)}`;
    const response = await axios.get(apiUrl);

    // Memeriksa apakah API berhasil mengembalikan data yang valid
    if (response.data && response.data.status && response.data.data) {
      const { title, artis, image, download } = response.data.data;

      // Mengirimkan informasi lagu ke pengguna
      await hanz.sendMessage(
        m.chat,
        { 
          caption: `*Title:* ${title}\n*Artist:* ${artis}\n\nKlik link berikut untuk mengunduh: ${download}`, 
          image: { url: image } 
        }, 
        { quoted: m }
      );

      // Jika ingin mengirimkan audio ke pengguna
      await hanz.sendMessage(
        m.chat, 
        { 
          audio: { url: download }, 
          mimetype: 'audio/mpeg' 
        }, 
        { quoted: m }
      );

    } else {
      m.reply("Gagal mendapatkan link unduhan. Pastikan URL lagu yang diberikan benar atau coba lagi nanti.");
    }
  } catch (error) {
    console.error(error);
    m.reply("Terjadi kesalahan saat mengunduh lagu. Silakan coba lagi nanti.");
  }
};
handler.help = ["ytmp3"];
handler.tags = ["internet", "media"];
handler.command = ["spotifydl"];
module.exports = handler;
