const fetch = require('node-fetch');

let handler = async (m, { hanz, args, usedPrefix, command }) => {
    // Memeriksa apakah ada argumen yang diberikan untuk pencarian
    if (!args[0]) return m.reply(`Contoh: ${usedPrefix + command} nabawiyah`);

    // Menggunakan argumen sebagai kata kunci pencarian
    const searchQuery = args.join(" ");
    const apiUrl = `https://api-lenwy.vercel.app/caribuku?search=${encodeURIComponent(searchQuery)}`;

    try {
        // Melakukan permintaan ke API
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Memeriksa apakah ada buku yang ditemukan
        if (!data || !data.length) {
            return m.reply('Tidak ada buku yang ditemukan.');
        }

        // Menyiapkan pesan hasil pencarian
        let resultMessage = 'Hasil Pencarian Buku:\n\n';
        
        // Mengiterasi hasil yang ditemukan
        data.forEach((book, index) => {
            resultMessage += `${index + 1}. *Judul:* ${book.title}\n`;
            resultMessage += `   *Link:* ${book.link}\n`;
            resultMessage += `   *Rating:* ${book.rating}\n\n`;
        });

        // Mengirimkan hasil pencarian ke pengguna
        await hanz.sendMessage(m.chat, { text: resultMessage }, { quoted: m });
    } catch (error) {
        console.error(error);
        m.reply('Terjadi kesalahan saat mengambil data. Silakan coba lagi.');
    }
};

handler.help = ['caribuku <judul>'];
handler.tags = ['search'];
handler.command = /^(caribuku)$/i;

module.exports = handler;
