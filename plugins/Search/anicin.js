const axios = require('axios');
const cheerio = require('cheerio');

const handler = async (m, { args, hanz }) => {
    // Memastikan ada query yang diberikan oleh pengguna
    if (!args[0]) return m.reply('Silakan masukkan kata kunci untuk mencari anime\n\n*contoh*: .anicin donghua.');

    let query = args.join(' '); // Menggabungkan semua argumen sebagai query pencarian
    let results = await cariAnime(query); // Memanggil fungsi untuk mengambil hasil pencarian

    if (results.length === 0) {
        return m.reply('Tidak ada hasil yang ditemukan untuk kata kunci tersebut.');
    }

    // Membuat pesan daftar hasil pencarian
    let message = `*Hasil Pencarian untuk "${query}":*\n\n`;
    results.forEach((result, index) => {
        message += `${index + 1}. *${result.title}*\n${result.url}\n\n`;
    });

    await m.reply(message);
};

handler.command = ['anicin']; // Command untuk memanggil fitur
handler.tags = ['anime'];
handler.help = ['carianime <query>'];
module.exports = handler;

// Fungsi untuk mengambil hasil pencarian dari anichin.date
const cariAnime = async (query) => {
    try {
        const response = await axios.get(`https://anichin.date/?s=${encodeURIComponent(query)}`);
        const html = response.data;
        const $ = cheerio.load(html);
        const results = [];

        $('.postbody .bixbox .listupd article.bs').each((index, element) => {
            const title = $(element).find('h2[itemprop="headline"]').text().trim();
            const url = $(element).find('a[itemprop="url"]').attr('href');
            results.push({ title, url });
        });

        return results;
    } catch (error) {
        console.error('Terjadi kesalahan saat mencari anime:', error);
        return []; // Mengembalikan array kosong jika terjadi error
    }
};
