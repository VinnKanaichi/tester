const yts = require('yt-search'); // 
const fetch = require('node-fetch');

let handler = async (m, { q,hanz,sendReact }) => {
    if (!q) return m.reply('Apa yang mau dicari, bwang?'); 
    try {
    sendReact('🕒')   
        let rus = await yts(q);
        let res = rus.all.filter(v => v.type === 'video'); // 
        if (res.length === 0) return m.reply("Video tidak ditemukan.");

        let videoID = res[0].videoId;

        
        let thumbUrl = `https://i.ytimg.com/vi/${videoID}/mqdefault.jpg`;
        let imag = await fetch(thumbUrl).then(res => res.buffer()).catch(() => null);
        if (!imag) {
            thumbUrl = `https://i.ytimg.com/vi/${videoID}/sqdefault.jpg`;
            imag = await fetch(thumbUrl).then(res => res.buffer()).catch(() => null);
        }

        
        let teks = `*乂 S E A R C H - V I D E O*\n\n` +
                   `🌐 Upload: ${res[0].ago}\n` +
                   `⏱️ Durasi: ${res[0].timestamp}\n` +
                   `🎥 Channel: ${res[0].author.name}\n` +
                   `🖇️ Link: ${res[0].url}\n\n` +
                   `*_Tunggu sebentar ya kak, sedang mengirim video!_*`;

        
      
hanz.sendMessage(m.chat, {
    image: imag,
    caption: teks,
    contextInfo: {
        externalAdReply: {
            showAdAttribution: true,
            title: `${res[0].title}`, // 
            body: `${res[0].author.name}`, // 
            renderLargerThumbnail: true,
            thumbnail: imag, // 
            mediaUrl: res[0].url, // 
            sourceUrl: res[0].url  // 
        }
    }
}, { quoted: m });


        
        const response = await fetch(`https://api-lenwy.vercel.app/mp4?url=${encodeURIComponent(res[0].url)}`);
        const json = await response.json();
        if (json.status !== 200) throw new Error("Gagal mengambil data video.");

        const videoData = json.data;

        
        await hanz.sendMessage(m.chat, { video: { url: videoData.download_url }, caption: '_Suuces_' }, { quoted: m });

    } catch (err) {
        console.log(err);
      //  m.reply(`Bjir, durasinya ${res[0].timestamp} 😤\nAu ah, ga mau download.`);
    }
};

handler.help = ["ytvideo"];
handler.tags = ["search"];
handler.command = ["ytvideo", "ytv"]; // 

module.exports = handler;
