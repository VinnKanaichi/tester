const fetch = require('node-fetch');

// Handler utama untuk plugin emojimix
const handler = async (m, { hanz, setReply, args, command, prefix }) => {
    try {
        // Memeriksa input emoji
        let [emoji1, emoji2] = args.join(' ').split`+`;
        if (!emoji1 || !emoji2) {
            return setReply(`Example: ${prefix + command} 😅+🤔`);
        }

        setReply('Please wait...'); // Pesan menunggu

        // Mengambil data emojimix dari API
        let response = await fetch(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`);
        let anu2 = await response.json();

        // Mengirimkan stiker dari hasil emojimix
        for (let res of anu2.results) {
            await hanz.sendImageAsSticker(m.chat, res.url, m);
        }

    } catch (err) {
        // Menangani error dan memberikan pesan kepada pengguna
        setReply('Terjadi kesalahan, silakan coba lagi!');
        console.error('Error:', err.message); // Logging untuk debugging
    }
};

// Daftar command yang akan dijalankan oleh plugin
handler.help = ['emojimix'];
handler.tags = ['sticker'];
handler.command = /^(emojimix)$/i;

module.exports = handler;
