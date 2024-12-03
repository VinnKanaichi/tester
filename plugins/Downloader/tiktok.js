const fetch = require('node-fetch');
const { isUrl } = require('../../lib/myfunc');

const handler = async (m, {q, hanz, args, command, prefix,sendSticker,otw }) => {
    

    if (!isUrl) return m.reply(`⚠️ Masukkan link TikTok yang valid!\n\nContoh: ${prefix + command} https://vm.tiktok.com/ZS`);
      if (args.length < 1) return m.reply(`Link?\nContoh: ${prefix + command} https://vm.tiktok.com/ZSRfArwXH/`)

    
    try {
       sendSticker(otw)
        
        // Fetch data dari API TikTok
        const response = await fetch(`https://skizoasia.xyz/api/tiktok?url=${q}&apikey=Rangelofficial`);
        const data = await response.json();

        if (data.data.duration == 0) {
            for (const image of data.data.images) {
                await hanz.sendMessage(m.chat, { image: { url: image } }, { quoted: m });
                await new Promise(resolve => setTimeout(resolve, 1500)); // Jeda untuk setiap gambar
            }
        } else {
            // Format pesan dengan informasi video
const tkes = `${gris1}
*乂 Tiktok Downloader*

📌 *ID:* ${data.data.id}
🌍 *Region:* ${data.data.region}
🎬 *Judul:* ${data.data.title}
⏱️ *Durasi:* ${data.data.duration} detik
🎵 *Musik:* ${data.data.music}

🎼 *Info Musik:*
🎤 *Judul:* ${data.data.music_info.title}
🎧 *Author:* ${data.data.music_info.author}

📊 *Statistik Video:*
👁️ *Ditonton:* ${data.data.play_count} kali
💬 *Komentar:* ${data.data.comment_count}
🔗 *Dibagikan:* ${data.data.share_count} kali
📥 *Didownload:* ${data.data.download_count} kali ${gris1}
            `;
            
            await hanz.sendMessage(m.chat, { video: { url: data.data.play }, caption: tkes }, { quoted: m });
        }
        
        const musicData = await fetch(`https://skizoasia.xyz/api/tiktok?url=${q}&apikey=Rangelofficial`);
        const music = await musicData.json();

        await hanz.sendMessage(m.chat, { audio: { url: music.data.music }, mimetype: 'audio/mp4' }, { quoted: m });
    } catch (err) {
        console.error(err);
        //m.reply('⚠️ Terjadi kesalahan saat memproses permintaan Anda.');
    }
};

handler.help = ['tiktok <link>'];
handler.tags = ['downloader'];
handler.command = /^(tiktok|tt|tiktoknowm|ttnowm)$/i;
handler.limit = true
module.exports = handler;
