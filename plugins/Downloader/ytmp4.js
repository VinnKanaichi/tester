const fetch = require('node-fetch');

let handler = async (m, { hanz, text }) => {
  if (!text) return m.reply('Silakan masukkan tautan YouTube yang ingin diunduh.');
m.reply(mess.wait)
  try {
    // Mengakses API
    const response = await fetch(`https://api-lenwy.vercel.app/mp4?url=${encodeURIComponent(text)}`);
    const json = await response.json();

    if (json.status !== 200) throw new Error("Gagal mengambil data video.");
    
    const videoData = json.data;

    const caption = `📹 *Judul:* ${videoData.title}\n🎞️ *Kualitas:* ${videoData.type}`;

    // Mengirim video
    await hanz.sendMessage(m.chat, { video: { url: videoData.download_url }, caption: caption }, { quoted: m });
  } catch (error) {
    console.error("Error:", error);
    m.reply("Maaf, terjadi kesalahan dalam mengambil video.");
  }
};

handler.command = ['ytmp4'];
handler.tags = ['downloader'];
handler.help = ['ytmp4 <url>'];
handler.limit = true;

module.exports = handler;

