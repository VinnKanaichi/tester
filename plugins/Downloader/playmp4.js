const fetch = require('node-fetch');

let handler = async (m, { hanz, text, setReply }) => {
  // Validasi input
  if (!text) return setReply(`❌ *Masukkan kata kunci pencarian video YouTube.*\n\nContoh: .ytplay angkasa`);

  try {
    // Mengambil data dari API dengan kata kunci
    let response = await fetch(`https://api.agatz.xyz/api/ytplayvid?message=${encodeURIComponent(text)}`);
    if (!response.ok) throw new Error("Gagal mengambil data dari API.");

    let json = await response.json();
    if (json.status !== 200 || !json.data) throw new Error("Video tidak tersedia atau terjadi kesalahan.");

    // Ekstrak informasi dari respons API
    const { title, description, url, duration, views, uploadedAt, author, downloadUrl } = json.data;

    // Mengatur teks deskripsi yang menarik
    const captions = `🎬 *Hasil Pencarian Video YouTube* 🎬\n\n` +
                     `📌 *Judul*: ${title}\n` +
                     `🖋️ *Channel*: ${author}\n` +
                     `⏳ *Durasi*: ${duration}\n` +
                     `👁️ *Ditonton*: ${views} kali\n` +
                     `📅 *Diunggah*: ${uploadedAt}\n` +
                     `🔗 *Tonton di YouTube*: ${url}\n\n` +
                     `⬇️ *Link Unduhan*: [Download Video](${downloadUrl})\n\n` +
                     `_Video Akan Sedang Di Unduh Mohon Di Tunggu_`;

    // Mengirimkan tautan unduhan dan deskripsi
    await hanz.sendMessage(m.chat, {
      text: captions,
      contextInfo: {
        externalAdReply: {
          title: title,
          body: `Video dari ${author}`,
          thumbnailUrl: "https://i.ytimg.com/vi/HR3rRParxoY/hqdefault.jpg", // Gunakan thumbnail dari video jika tersedia
          mediaUrl: url,
          mediaType: 1
        }
      }
    }, { quoted: m });

    // Kirim video langsung dari URL download jika diinginkan
    await hanz.sendMessage(m.chat, {
      video: { url: downloadUrl },
      caption: "Berikut video yang kamu cari!"
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    setReply("Maaf, terjadi kesalahan dalam mengambil video.");
  }
};

handler.command = ['playmp4'];
handler.tags = ['downloader'];
handler.help = ['ytplay <kata kunci>'];
handler.limit = true;

module.exports = handler;
