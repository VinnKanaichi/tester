const fs = require('fs');
const { removeBackgroundFromImageFile } = require('remove.bg');
const { getRandom } = require('../../lib/myfunc'); // Pastikan ada fungsi getRandom atau ganti sesuai kebutuhan.

const handler = async (m, { hanz, args}) => {
  if (!m.quoted) return m.reply('Kirim gambar yang ingin dihapus background-nya.');

    const quoted = m.quoted ? m.quoted : m;

  let mime = (m.quoted.msg || m.quoted).mimetype || '';
  if (/image/.test(mime)) { // Cek apakah media adalah gambar
    try {
      m.reply('Tunggu sebentar, proses penghapusan background...');

      // Unduh media gambar
      const media = await hanz.downloadAndSaveMediaMessage(quoted);
      let ranp = getRandom('.png'); // Nama file hasil

      const apiKeys = ['sECv6pvJTwLGMZ53CuPoijgm'];
      const selectedApiKey = apiKeys[Math.floor(Math.random() * apiKeys.length)];

      // Menggunakan API remove.bg
      await removeBackgroundFromImageFile({
        path: media,
        apiKey: selectedApiKey,
        size: 'auto',
        type: 'auto'
      }).then((res) => {
        fs.unlinkSync(media); // Hapus file media asli setelah digunakan

        let buffer = Buffer.from(res.base64img, 'base64');
        fs.writeFileSync(ranp, buffer); // Simpan gambar yang sudah dihapus background-nya

        // Kirim gambar yang sudah tanpa background
        hanz.sendMessage(m.chat, { image: fs.readFileSync(ranp), caption: 'Tanpa background' }, { quoted: m });

        // Hapus file hasil setelah dikirim
        fs.unlinkSync(ranp);
      }).catch((err) => {
        console.log('Error:', err);
        m.reply('Gagal menghapus background, silakan coba lagi nanti.');
      });

    } catch (err) {
      console.log('Error:', err);
      m.reply('Terjadi kesalahan, silakan coba beberapa saat lagi.');
    }
  } else {
    m.reply('Format file tidak didukung. Harap kirim gambar.');
  }
};

handler.help = ['removebg'];
handler.tags = ['tools'];
handler.command = /^(nobg|removebg)$/i;

module.exports = handler;
