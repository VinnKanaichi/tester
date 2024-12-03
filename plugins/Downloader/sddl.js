const fetch = require('node-fetch');
const fs = require('fs');
const axios = require('axios');

const handler = async (m, { text, usedPrefix, hanz, command, setReply }) => {
    if (!text) return setReply(`Contoh penggunaan: ${usedPrefix + command} <url_soundcloud>`);

    let url = `https://api.agatz.xyz/api/soundclouddl?url=${encodeURIComponent(text)}`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data.status === 200 && data.data) {
            const { title, duration, quality, thumbnail, download } = data.data;

            // Mengunduh audio dari link
            const audioFilePath = `./${Date.now()}.mp3`;
            const writer = fs.createWriteStream(audioFilePath);

            const downloadResponse = await axios({
                url: download,
                method: 'GET',
                responseType: 'stream',
            });

            downloadResponse.data.pipe(writer);

            writer.on('finish', async () => {
                try {
                    const caption = `*Judul:* ${title}\n*Durasi:* ${duration}\n*Kualitas:* ${quality}`;

                    // Mengirimkan audio dengan quoted dan contextInfo
                    await hanz.sendMessage(m.chat, {
                        audio: { url: audioFilePath },
                        mimetype: 'audio/mp4a',
                        fileName: `${title}.mp3`,
                        quoted: m, // Menambahkan pesan yang di-quote
                        contextInfo: {
                            externalAdReply: {
                                title: title,
                                body: `Durasi: ${duration} | Kualitas: ${quality}`,
                                thumbnailUrl: thumbnail,
                                mediaType: 2, // audio type
                                mediaUrl: download
                            }
                        }
                    });

                    fs.unlinkSync(audioFilePath); // Menghapus file setelah dikirim
                } catch (sendError) {
                    console.error("Error saat mengirim audio:", sendError);
                    setReply("Terjadi kesalahan saat mengirim audio.");
                    fs.unlinkSync(audioFilePath); // Menghapus file jika ada kesalahan
                }
            });

            writer.on('error', (writeError) => {
                console.error("Error saat mengunduh audio:", writeError);
                setReply("Terjadi kesalahan saat mengunduh audio.");
            });
        } else {
            setReply("Maaf, tidak ada hasil yang ditemukan atau URL tidak valid.");
        }
    } catch (error) {
        console.error("Error saat menghubungi API:", error);
        setReply("Terjadi kesalahan saat menghubungi API.");
    }
};

handler.help = ['soundclouddl'];
handler.command = ['soundclouddl', 'sddl'];
handler.tags = ['audio'];

module.exports = handler;
