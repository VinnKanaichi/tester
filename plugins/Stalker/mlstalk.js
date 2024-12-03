const fetch = require('node-fetch');
const { mlstalk } = require('../../lib/scraper');

let handler = async (m, { text, setReply }) => {
    try {
        // Pengecekan input
        if (!text) return setReply(`✨ *Cara penggunaan:* ✨\nKetik dengan format: *530793138|8129*\n\nPastikan ID dan Zone ID kamu benar ya!`);

        // Memisahkan ID dan Zone ID
        let [id, zone] = text.split('|');
        if (!id || !zone) return setReply(`⚠️ *Format salah!* ⚠️\nGunakan format seperti ini: *530793138|8129*\nCek kembali ID dan Zone ID kamu.`);

        // Memanggil fungsi mlstalk
        let dat = await mlstalk(id.trim(), zone.trim());

        // Jika data ditemukan
        if (dat && dat.userName) {
            setReply(`🎮 *Mobile Legends Stalking Result* 🎮\n\n👤 *Nama*: ${dat.userName}\n🆔 *ID*: ${id}\n🌍 *Zone ID*: ${zone}\n\nTerima kasih telah menggunakan layanan kami!`);
        } else {
            // Jika data tidak ditemukan
            setReply('❌ *ID tidak ditemukan!* Mungkin ID atau Zone ID salah, coba periksa kembali.');
        }
    } catch (e) {
        // Penanganan kesalahan
        console.error(e);
        setReply('⚠️ *Terjadi kesalahan!* Mohon coba lagi nanti.');
    }
};

// Menentukan command dan tags handler
handler.command = ['mlstalk'];
handler.tags = ['social'];

module.exports = handler;
