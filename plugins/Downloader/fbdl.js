/* 
  ────────「 *RANGELOFFICIAL* 」──────── 
  Powered by *EhanzDhoanx* × *MENHERA MD* 
  Copyright © Raihan Fadillah 
  Instagram: @ehanzdhonax 

  ⚠️ *Jangan hapus watermark ini!* 
  Dukunganmu sangat berarti untuk kami! 
  ──────────────────────────────── 
*/



const fetch = require('node-fetch');

let handler = async (m, { hanz, text, usedPrefix, command }) => {
  if (!text) throw `Masukkan URL Facebook.\nContoh: ${usedPrefix + command} https://www.facebook.com/reel/947495549897838`;

  m.reply('Mencari video...');

  try {
    let apiUrl = `https://api.agatz.xyz/api/facebook?url=${encodeURIComponent(text)}`;
    let res = await fetch(apiUrl);

 
    if (!res.ok) throw 'Gagal mengambil data dari API';

    let json = await res.json();
    console.log('API Response:', json); 

    if (json.status !== 200) throw 'Terjadi kesalahan: ' + json.creator;

    let { url, hd, title, thumbnail } = json.data;


    await hanz.sendMessage(m.chat, {
      video: { url: hd },
      caption: `*Judul:* ${title}\n*Thumbnail:* ${thumbnail}\n*Link:* ${url}`
    }, { quoted: m });

  } catch (error) {
    console.error(error); 
    m.reply(`Terjadi kesalahan: ${error}`);
  }
};

handler.command = ['fbdl','facebook']
handler.help = ['facebook'];
handler.tags = ['downloader'];
handler.limit = false;
handler.premium = true;

module.exports = handler;