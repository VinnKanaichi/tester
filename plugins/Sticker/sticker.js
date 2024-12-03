const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const fs = require('fs');
const path = require('path');
const { getRandom, makeid } = require('../../lib/myfunc'); // Sesuaikan path ini dengan path yang tepat di project Anda

// Handler utama untuk plugin stiker
const handler = async (m, { hanz, setReply, command}) => {
    // Cek tipe media yang dikirim
    const isImage = (m.type === 'imageMessage');
    const isVideo = (m.type === 'videoMessage');
    const isQuotedImage = m.quoted && m.quoted.mtype === 'imageMessage';
    const isQuotedVideo = m.quoted && m.quoted.mtype === 'videoMessage';
    const isViewOnce = (m.type === 'viewOnceMessageV');
    const isQuotedViewOnce = m.quoted && m.quoted.mtype === 'viewOnceMessage';

    // Ambil MIME tipe pesan
    let mime = (m.msg || m).mimetype || '';
    const quoted = m.quoted ? m.quoted : m;

    // Cek apakah media yang dikirim adalah gambar, video, atau view once
    if (/image/.test(mime) || /video/.test(mime) || isViewOnce || isImage || isQuotedImage || isVideo || isQuotedVideo || isQuotedViewOnce) {
        
        // Batasi durasi video maksimal 10 detik
        if ((isVideo || isQuotedVideo) && quoted.seconds > 10) {
            return setReply(m.chat, 'Maksimal durasi video adalah 10 detik!', m);
        }
        
        // Tentukan kualitas berdasarkan tipe media (gambar atau video)
        let kualitas = /image/.test(mime) ? 70 : 2;
        
        // Unduh media yang direply atau dikirim
        let media = await hanz.downloadAndSaveMediaMessage(quoted, makeid(5));
        
        // Buat stiker dari media yang diunduh
        let sticker = new Sticker(media, {
            pack: botName, // Nama pack
            author: m.pushname, // Nama pembuat (pengguna yang mengirim)
            type: StickerTypes.FULL, // Jenis stiker (FULL atau CROPPED)
            categories: ['🤩', '🎉'], // Kategori stiker (opsional)
            id: '12345', // ID unik stiker
            quality: kualitas, // Kualitas output file
            background: '#FFFFFF00' // Warna latar belakang (untuk stiker full)
        });
        
        // Simpan stiker dalam format .webp
        let stickerFilePath = getRandom('.webp');
        await sticker.toFile(stickerFilePath);
        let stickerBuffer = fs.readFileSync(stickerFilePath);
        
        // Kirim stiker ke chat
        await hanz.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m });
        
        // Hapus file sementara setelah digunakan
        fs.unlinkSync(stickerFilePath);
        fs.unlinkSync(media);
    
    } else {
        // Jika bukan gambar atau video, beri informasi cara penggunaan
        setReply( `Kirim gambar atau video dengan caption ${command} atau balas gambar/video yang sudah dikirim. Note: Maksimal durasi video adalah 10 detik!`);
    }
};

// Daftar command yang akan dijalankan oleh plugin
handler.help = ['sticker', 'stiker', 's'];
handler.tags = ['sticker'];
handler.command = /^(s|sticker|stiker)$/i; // Menentukan command yang terkait dengan plugin ini

module.exports = handler;
