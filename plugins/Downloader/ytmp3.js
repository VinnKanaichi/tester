const fetch = require('node-fetch');

let handler = async (m, { hanz, text }) => {
  if (!text) return m.reply('Silakan masukkan tautan YouTube yang ingin diunduh sebagai audio.');

  try {
    // Mengakses API
    const response = await fetch(`https://api-lenwy.vercel.app/mp3?url=${encodeURIComponent(text)}`);
    const json = await response.json();

    if (json.status !== 200) throw new Error("Gagal mengambil data audio.");
    const audioData = json.data;

    const caption = Ehztext(`🎶 *Judul:* ${audioData.title}\n🎧 *Kualitas:* ${audioData.type}\n\nSedang mengirim audio...`);

    // Mengirim gambar dengan keterangan, lalu audio
    await hanz.sendMessage(m.chat, { image: { url: audioData.image }, caption: caption }, { quoted: m });
    await hanz.sendMessage(m.chat, { audio: { url: audioData.download_url }, mimetype: 'audio/mp4' }, { quoted: m });
    
  } catch (error) {
    console.error(error);
    m.reply("Maaf, terjadi kesalahan dalam mengambil audio.");
  }
};

handler.command = ['ytmp3'];
handler.tags = ['downloader'];
handler.help = ['ytmp3 <url>'];
handler.limit = true;

module.exports = handler;
