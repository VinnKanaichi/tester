const fetch = require('node-fetch');

let handler = async (m, { hanz, sendMessage, text }) => {
  // Memeriksa apakah teks (username) diberikan
  if (!text) throw 'Harap masukkan nama pengguna GitHub.';

  try {
    // Mengambil data pengguna GitHub dari API
    let res = await fetch(`https://api.agatz.xyz/api/ghtstalk?name=${encodeURIComponent(text)}`);
    let json = await res.json();

    // Memeriksa status respon dari API
    if (json.status !== 200 || !json.data) {
      throw 'Data tidak ditemukan.';
    }

    // Mengambil data pengguna dari respons API
    let data = json.data; 
    let message = `*Nama:* ${data.name || 'Tidak ada nama'}\n` +
                  `*Username:* ${data.login}\n` +
                  `*Bio:* ${data.bio || 'Tidak ada bio'}\n` +
                  `*Followers:* ${data.followers}\n` +
                  `*Following:* ${data.following}\n` +
                  `*Public Repositories:* ${data.public_repos}\n` +
                  `*Blog:*
${data.blog || 'Tidak ada blog'}\n` +
                  `*Lokasi:* ${data.location || 'Tidak ada lokasi'}\n` +
                  `*Email:* ${data.email || 'Tidak ada email'}\n` +
                  `*Twitter:* ${data.twitter_username || 'Tidak ada Twitter'}\n` +
                  `*Profil:* ${data.html_url}`;

    // Mengirimkan pesan ke pengguna dengan contextInfo, thumbnailUrl, dan sourceUrl
    await hanz.sendMessage(m.chat, {
      text: message, // Mengirimkan pesan teks
      contextInfo: {
        mentionedJid: [m.sender], // Menyebut pengguna yang memanggil perintah
        externalAdReply: {
            showAdAttribution: true,
          title: `Profil GitHub ${data.name || data.login}`,
          body: 'Informasi Pengguna GitHub',
          mediaType: 1, // Tipe media
          thumbnailUrl: data.avatar_url, // Menggunakan URL avatar sebagai thumbnail
          sourceUrl: data.html_url // Link ke profil GitHub
        }
      }
    });
  } catch (e) {
    // Menangani kesalahan dan mengirimkan pesan kesalahan
      await hanz.sendMessage(m.chat, {
      text: `Terjadi kesalahan: ${e.message || e}`,
      contextInfo: {
        mentionedJid: [m.sender] // Menyebut pengguna yang memanggil perintah
      }
    });
  }
};

// Menetapkan nama command dan tag
handler.command = ['ghstalk'];
handler.tags = ['social'];

// Mengekspor handler untuk digunakan di tempat lain
module.exports = handler;