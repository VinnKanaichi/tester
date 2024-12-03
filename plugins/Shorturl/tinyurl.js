const { isUrl } = require('../../lib/myfunc'); // Pastikan isUrl diimpor dengan benar
const fetch = require('node-fetch'); // Memastikan fetch bisa digunakan di Node.js

let handler = async (m, { q, setReply }) => {
    if (!q) return setReply('Masukkan link');

    if (!isUrl(q)) return setReply('Masukkan link yang valid');

    const fetchText = (url, optiono) => {
        return new Promise((resolve, reject) => {
            fetch(url, optiono)
                .then(response => response.text())
                .then(text => resolve(text))
                .catch(err => {
                    console.log(`Error: ${err}`); // Mencetak error dengan lebih jelas
                    reject(err);
                });
        });
    };

    try {
        let okok = await fetchText(`https://tinyurl.com/api-create.php?url=${q}`);
        let shorti = `*Result* : ${okok}`;
        await setReply(shorti);
    } catch (error) {
        setReply('Terjadi kesalahan saat membuat short link. ⚠️');
    }
};

handler.help = ["shorten"];
handler.tags = ["utility"];
handler.command = ["tinyurl"]; // Alias command untuk memperpendek URL

module.exports = handler;
