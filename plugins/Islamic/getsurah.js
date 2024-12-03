const { getSurah } = require('../../lib/scraper');  // Mengimpor fungsi 'getSurah'

let handler = async (m, { q, prefix, command, isGroup }) => {
    // Mengecek apakah perintah dilakukan di grup
    

    // Mengecek apakah ada input (nomor surah)
    if (!q) {
        return m.reply(`Angka?\nContoh: ${prefix + command} 1\n\n*Note*: 1 = Al-Fatihah\n\nKetik ${prefix}listsurah untuk mengetahui nomor surah-surah lain`);
    }

    // Mengonversi input menjadi angka
    const surahIndex = parseInt(q);

    // Validasi apakah input adalah angka yang sah
    if (isNaN(surahIndex)) {
        return m.reply('❌ *Input tidak valid. Harap masukkan angka yang sesuai.*');
    }

    try {
        // Mendapatkan data surah berdasarkan index
        const res = await getSurah(surahIndex);

        // Mengirimkan hasil surah
        m.reply(res);
    } catch (e) {
        console.error(e);  // Logging error ke console
        m.reply('❌ *Terjadi kesalahan saat mengambil surah. Silakan coba lagi nanti.*');
    }
};

handler.help = ["surah"];  // Menambahkan help untuk 'surah'
handler.tags = ["islamic"];  // Tag kategori
handler.group = false
handler.command = ["getsurah"];  // Perintah untuk 'surah'

module.exports = handler;