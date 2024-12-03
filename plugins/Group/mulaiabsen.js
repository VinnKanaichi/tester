let handler = async (m, { hanz, usedPrefix, text }) => {
    // Pastikan objek absen ada
    hanz.absen = hanz.absen ? hanz.absen : {};
    let id = m.chat;

    // Memeriksa apakah sudah ada absen yang berlangsung di grup ini
    if (id in hanz.absen) {
        await hanz.reply(m.chat, `❗ *Masih ada absen berlangsung di grup ini!*\n\n*${usedPrefix}hapusabsen* - untuk menghapus absen`, m);
        return; // Menghentikan eksekusi jika sudah ada absen
    }

    // Memulai absen baru
    hanz.absen[id] = [
        await hanz.reply(m.chat, `✅ *Berhasil memulai absen!*\n\n*${usedPrefix}absen* - untuk melakukan absen\n*${usedPrefix}cekabsen* - untuk mengecek daftar hadir\n*${usedPrefix}hapusabsen* - untuk menghapus data absen\n\n*Deskripsi:* ${text}`, m),
        [],
        text
    ];
}

handler.help = ['mulaiabsen [teks]'];
handler.tags = ['absen'];
handler.command = /^(start|mulai)absen$/i;
handler.group = true; // Mengatur agar perintah hanya dapat digunakan di grup
handler.admin = true; // Mengatur agar hanya admin yang bisa menggunakan perintah ini

module.exports = handler;
