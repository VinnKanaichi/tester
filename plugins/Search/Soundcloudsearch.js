const fetch = require('node-fetch');

const handler = async (m, { text, usedPrefix, command }) => {
    let query = text  // Default pencarian adalah "beat" jika tidak ada teks input
    let url = `https://api.agatz.xyz/api/soundcloud?message=${encodeURIComponent(query)}`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data.status === 200 && data.data.length > 0) {
            let hasil = `Hasil pencarian SoundCloud untuk "${query}":\n\n`;
            
            // Loop untuk menampilkan judul dan link dari hasil
            data.data.forEach((item, index) => {
                hasil += `${index + 1}. ${item.judul}\nLink: ${item.link}\n\n`;
            });

            m.reply(hasil.trim()); // Mengirim hasil ke user
        } else {
            m.reply("Maaf, tidak ada hasil yang ditemukan.");
        }
    } catch (error) {
        console.error(error);
        m.reply("Terjadi kesalahan saat menghubungi API.");
    }
};

handler.help = ['soundcloud'];
handler.command = ['soundcloudsearch', 'soncloudser'];
handler.tags = ['audio'];

module.exports = handler;
