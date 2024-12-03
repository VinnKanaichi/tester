let handler = async (m, { hanz, usedPrefix }) => {
    let id = m.chat;
    hanz.absen = hanz.absen ? hanz.absen : {}; // Pastikan objek absen ada

    // Memeriksa apakah ada absen yang berlangsung di grup ini
    if (!(id in hanz.absen)) {
        await hanz.reply(m.chat, `_*Tidak ada absen berlangsung di grup ini!*_\n\n*${usedPrefix}mulaiabsen* - untuk memulai absen`, m);
        return; // Menghentikan eksekusi jika tidak ada absen
    }

    // Menghapus data absen untuk grup ini
    delete hanz.absen[id];
    
    // Mengirim pesan konfirmasi
    await hanz.reply(m.chat, `✅ *Berhasil!* Absen di grup ini telah dihapus.`, m);
}

handler.help = ['hapusabsen'];
handler.tags = ['absen'];
handler.command = /^(delete|hapus)absen$/i;
handler.group = true; // Mengatur agar perintah ini hanya dapat digunakan di grup
handler.admin = true; // Mengatur agar hanya admin yang bisa menggunakan perintah ini

module.exports = handler;

