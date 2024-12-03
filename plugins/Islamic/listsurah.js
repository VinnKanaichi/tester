const { listsurah } = require('../../lib/scraper');  // Mengimpor fungsi 'listsurah'

let handler = async (m, { prefix, command }) => {
    if (command === 'listsurah') {
        try {
            m.reply('🔍 *Sedang memuat daftar surah... Mohon tunggu sebentar*');

            // Mengambil daftar surah
            let res = await listsurah();
            let teks = `📜 *Berikut adalah daftar surah yang tersedia:*\n\n`;
            let pre = 1;

            // Menyusun hasil daftar surah
            for (let i of res) {
                teks += `*𖦹 No :* ${pre++}\n`;  // Menampilkan nomor urut surah
                teks += `*📖 Nama Surah:* ${i.name_surah}\n`;  // Menampilkan nama surah
                teks += `*🔗 Link:* ${i.link}\n\n`;  // Menampilkan link untuk lebih lanjut
            }

            // Mengirimkan daftar surah
            m.reply(teks);
        } catch (e) {
            console.error(e);  // Menangani error dan mencatatnya
            m.reply('❌ *Gagal memuat daftar surah. Silakan coba lagi nanti.*');
        }
    }
};

handler.help = ["listsurah"];  // Menambahkan help untuk 'listsurah'
handler.tags = ["islamic"];  // Tag kategori
handler.command = ["listsurah"];  // Perintah untuk 'listsurah'

module.exports = handler;