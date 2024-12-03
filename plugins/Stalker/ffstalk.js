const { ffstalk } = require('../../lib/scraper'); // Pastikan fungsi ffstalk telah terdefinisi

let handler = async (m, { text, setReply, prefix, command }) => {
    try {
        // Pengecekan input
        if (!text) return setReply(`✨ *Cara penggunaan:* ✨\nKetik dengan format: *${prefix + command} 530793139*\n\nPastikan ID kamu benar ya!`);

        // Memanggil fungsi ffstalk
        let epep = await ffstalk(text.trim());

        // Jika data ditemukan
        if (epep && epep.id) {
            setReply(`🎯 *Free Fire Stalking Result* 🎯\n\n🆔 *ID*: ${epep.id}\n👤 *Nama*: ${epep.nickname}\n\nTerima kasih telah menggunakan layanan kami!`);
        } else {
            // Jika data tidak ditemukan
            setReply('❌ *ID tidak ditemukan!* Mungkin ID salah, coba periksa kembali.');
        }
    } catch (e) {
        // Penanganan kesalahan
        console.error(e);
        setReply('⚠️ *Terjadi kesalahan!* Mohon coba lagi nanti.');
    }
};

// Menentukan command dan tags handler
handler.command = ['ffstalk'];
handler.tags = ['social'];

module.exports = handler;
