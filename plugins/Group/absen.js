
let handler = async (m, { hanz, usedPrefix, pushname }) => {
    let id = m.chat;
    hanz.absen = hanz.absen ? hanz.absen : {}; // Pastikan absen ada dalam objek hanz

    // Memeriksa apakah ada absen yang sedang berlangsung
    if (!(id in hanz.absen)) {
        await hanz.reply(m.chat, `Tidak ada absen berlangsung!`, m);
        throw false; // Menghentikan eksekusi jika tidak ada absen
    }

    let absen = hanz.absen[id][1]; // Mengambil daftar absen dari chat
    if (absen.includes(m.sender)) throw 'Kamu sudah absen!'; // Memeriksa jika sudah absen

    absen.push(m.sender); // Menambahkan pengirim ke daftar absen
    let d = new Date();
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    // Membuat daftar absen dalam format yang diinginkan
    let list = absen.map((v, i) => ` ${i + 1}.  @${v.split`@`[0]}`).join('\n');
    let caption = `* TANGGAL *\n${date}\n${hanz.absen[id][2]}\n\n*DAFTAR ABSEN*\n*Total:* ${absen.length}\n${list}`;

    // Mengirim pesan absen dengan menyebutkan pengirim
    await hanz.reply(m.chat, caption, m, { mentions: hanz.parseMention(caption) });
}

handler.help = ['absen'];
handler.tags = ['absen'];
handler.command = /^(absen)$/i;

module.exports = handler;
