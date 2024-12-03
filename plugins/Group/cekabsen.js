
let handler = async (m, { hanz, prefix }) => {
    let id = m.chat;
    hanz.absen = hanz.absen ? hanz.absen : {}; // Pastikan objek absen ada

    // Memeriksa apakah ada absen yang berlangsung di grup ini
    if (!(id in hanz.absen)) {
        await hanz.reply(m.chat, `_*Tidak ada absen berlangsung di grup ini!*_\n\n*${prefix}mulaiabsen* - untuk memulai absen`, m);
        return; // Menghentikan eksekusi jika tidak ada absen
    }

    let d = new Date();
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    let absen = hanz.absen[id][1]; // Ambil daftar absen
    let list = absen.map((v, i) => `nih ${i + 1}.  @${v.split`@`[0]}`).join('\n'); // Buat daftar absen

    let caption = `* TANGGAL *\n${date}\n${hanz.absen[id][2]}\n\n* SUDAH ABSEN *\n*Total:* ${absen.length}\n\n${list}`; // Buat caption

    // Kirim pesan cek absen dengan menyebutkan peserta
    await hanz.reply(m.chat, caption, m, { mentions: hanz.parseMention(caption) });
}

handler.help = ['cekabsen'];
handler.tags = ['absen'];
handler.command = /^cekabsen$/i;
handler.group = true; // Mengatur agar perintah ini hanya dapat digunakan di grup

module.exports = handler;
