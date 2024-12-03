const fetch = require('node-fetch');
//const { download } = require('some-download-library'); // Pastikan menggunakan library untuk download file jika diperlukan

let handler = async (m, { hanz, text }) => {
  if (!text) throw 'Harap masukkan URL video Xvideos yang ingin diunduh.';

  try {
    // Mengambil data dari API untuk mengunduh video
    let res = await fetch(`https://api.agatz.xyz/api/xvideodown?url=${encodeURIComponent(text)}`);
    let json = await res.json();

    // Memeriksa status respon dari API
    if (json.status !== 200 || !json.data) {
      throw 'Tidak dapat menemukan video untuk URL ini.';
    }

    // Mengambil informasi video dari API
    let videoData = json.data;

    // Mengunduh video menggunakan URL yang didapat dari API
    const videoUrl = videoData.url; // URL video untuk diunduh
    const videoResponse = await fetch(videoUrl);
    
    // Memeriksa apakah video berhasil diunduh
    if (!videoResponse.ok) throw 'Gagal mengunduh video.';

    // Mengirim video ke chat
    await hanz.sendMessage(m.chat, {
      video: { url: videoUrl }, // Menggunakan URL video
      caption: `**Judul:** ${videoData.title || 'Tidak ada judul'}\n` +
               `**Views:** ${videoData.views || 'Tidak ada informasi views'}\n` +
               `**Votes:** ${videoData.vote || 'Tidak ada informasi votes'}\n` +
               `**Likes:** ${videoData.like_count || 'Tidak ada informasi likes'}\n` +
               `**Dislikes:** ${videoData.dislike_count || 'Tidak ada informasi dislikes'}`,
    });

  } catch (e) {
    // Menangani kesalahan dan mengirimkan pesan kesalahan
    await hanz.sendMessage(m.chat, `Terjadi kesalahan: ${e.message || e}`);
  }
};

// Menetapkan nama command dan tag
handler.command = ['xvideosdl'];
handler.tags = ['download'];

module.exports = handler;