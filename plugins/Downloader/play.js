const yts = require('yt-search');
const axios = require('axios');
const { getBuffer } = require('../../lib/myfunc');

let handler = async (m, { q, hanz, sendSticker, otw, setReply }) => {
    if (!q) return setReply("Kirim perintah dengan judul lagu atau link YouTube-nya!");

    try {
        await sendSticker(otw); 

        let rus = await yts(q);
        if (rus.all.length === 0) return setReply("Video tidak ditemukan atau tidak bisa di-download.");

        let data = rus.all.filter(v => v.type === 'video');
        if (data.length === 0) return setReply("Tidak ada video yang ditemukan.");

        let res = data[0];
        let thumbUrl = `https://i.ytimg.com/vi/${res.videoId}/hqdefault.jpg`;
        let inithumb = await getBuffer(thumbUrl);

        let teks = `*🎶 Y O U T U B E  -  P L A Y 🎶*\n\n` +
                   `📺 *Channel* : ${res.author.name}\n` +
                   `👀 *Viewers* : ${res.views} kali\n` +
                   `⏱️ *Durasi* : ${res.timestamp}\n` +
                   `🔗 *Link Video* : ${res.url}\n\n` +
                   `🎧 *Audio sedang diproses...* 🎶`;

        await hanz.sendMessage(m.chat, {
            contextInfo: { 
                externalAdReply: { 
                    showAdAttribution: true, 
                    title: res.title,
                    body: new Date().toLocaleString(),													
                    mediaType: 2,  
                    renderLargerThumbnail: true,
                    thumbnail: inithumb,
                    mediaUrl: res.url,
                    sourceUrl: res.url
                }
            },
            image: { url: thumbUrl },
            text: teks
        }, { quoted: m });

        
        let apiURL = `https://aemt.uk.to/download/ytdl?url=${encodeURIComponent(res.url)}`;
        
        try {
            const response = await axios.get(apiURL);
            const data = response.data;

            if (!data.status) return setReply("Gagal mendapatkan data dari API, coba URL lain.");

            let { mp3, mp4,title } = data.result;

           
            await hanz.sendMessage(m.chat, { audio: { url: mp3 }, mimetype: 'audio/mp4' }, { quoted: m });
            await hanz.sendMessage(m.chat, { 
    video: { url: mp4 }, 
    mimetype: 'video/mp4', 
    caption: title 
}, { quoted: m });

        } catch (err) {
            setReply(`Terjadi kesalahan saat mengunduh audio/video: ${err.message}`);
        }
    } catch (err) {
        console.error(err);
      //  setReply(`Terjadi kesalahan: ${err.message}`);
    }
};

handler.help = ["play", "playmusik", "ytaudio"];
handler.tags = ["downloader"];
handler.limit = true;
handler.group = true;
handler.command = ["play", "playmusik", "ytaudio"];

module.exports = handler;


               

    
