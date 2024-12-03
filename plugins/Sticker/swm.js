const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const fs = require('fs');
const { getRandom } = require('../../lib/myfunc'); 
const handler = async (m, { hanz, setReply, args}) => {
    try {
    const quoted = m.quoted ? m.quoted : m;
    
        if (!quoted) {
            return setReply( 'Silakan reply stiker yang ingin di-WM!');
        }

        
        let ahuh = args.join(' ').split('|');
        let satu = ahuh[0] !== '' ? ahuh[0] : 'ehanz ngewe vyna 💦';
        let dua = typeof ahuh[1] !== 'undefined' ? ahuh[1] : '';

        // Mengunduh dan menyimpan media dari pesan yang di-reply
        let media = await hanz.downloadAndSaveMediaMessage(quoted);

        // Membuat stiker dengan watermark
        let sticker = new Sticker(media, {
            pack: satu, // Nama pack
            author: dua, // Nama author
            type: StickerTypes.FULL, // Jenis stiker
            categories: ['🤩', '🎉'], // Kategori stiker
            id: '12345', // ID stiker
            quality: 70, // Kualitas file output
            background: '#FFFFFF00' // Warna latar belakang (khusus stiker full)
        });

        // Simpan stiker dalam format .webp
        let stickerFilePath = getRandom('.webp');
        await sticker.toFile(stickerFilePath);
        let stickerBuffer = fs.readFileSync(stickerFilePath);

        // Mengirimkan stiker yang telah di-WM
        await hanz.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m });

        // Menghapus file sementara setelah digunakan
        fs.unlinkSync(stickerFilePath);
        fs.unlinkSync(media);

    } catch (err) {
        // Menangani error dan memberikan pesan kepada pengguna
        setReply( 'Ada yang salah, silakan reply stiker yang mau di-WM!');
        console.error('Error:', err.message); // Logging untuk debugging
    }
};

// Daftar command yang akan dijalankan oleh plugin
handler.help = ['stickerwm', 'take', 'wm', 'steal', 'swm'];
handler.tags = ['sticker'];
handler.command = /^(swm|steal|stickerwm|take|wm)$/i;

module.exports = handler;
