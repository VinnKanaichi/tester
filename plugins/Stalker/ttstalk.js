const cheerio = require('cheerio');
const fetch = require('node-fetch');

const mess = {
  wait: 'Sedang mengumpulkan data, mohon tunggu...',
};

const handler = async (m, { hanz, args, usedPrefix, text, command }) => {
  try {
    if (!text) return m.reply('Masukkan username TikTok yang ingin di-stalk');
    text = text.toLowerCase();
    let res = await stalk(text);
    if (res.status === 'error') throw res.message;
    await m.reply(mess.wait); // Ini sudah diperbaiki

    let verifiedBadge = res.user.verified ? '✅' : '';
    let privateBadge = res.user.privateAccount ? '🔒' : '';
    let sellerBadge = res.user.ttSeller ? '🛒' : '';

    let tek = `*───[ TikTok Stalker ]───*\n\n`;
    tek += `👤 *\`Username:\`* ${res.user.uniqueId || 'none'} ${verifiedBadge}\n`;
    tek += `🏷️ *\`Nickname:\`* ${res.user.nickname || 'none'}\n`;
    tek += `✍️ *\`Bio:\`* ${res.user.signature || 'Tidak ada bio'}\n`;
    tek += `🔗 *\`Bio Link:\`* ${res.user.bioLink ? res.user.bioLink.link : 'Tidak ada'}\n`;
    tek += `🌍 *\`Region:\`* ${res.user.region || 'Unknown'}\n`;
    tek += `📅 *\`Akun Dibuat:\`* ${new Date(res.user.createTime * 1000).toLocaleDateString('id-ID')}\n`;
    tek += `👥 *\`Followers:\`* ${res.stats.followerCount.toLocaleString() || '0'}\n`;
    tek += `👤 *\`Following:\`* ${res.stats.followingCount.toLocaleString() || '0'}\n`;
    tek += `❤️ *\`Hearts:\`* ${res.stats.heartCount.toLocaleString() || '0'}\n`;
    tek += `🎥 *\`Videos:\`* ${res.stats.videoCount.toLocaleString() || '0'}\n`;
    tek += `🔒 *\`Akun Pribadi:\`* ${res.user.privateAccount ? 'Ya' : 'Tidak'} ${privateBadge}\n`;
    tek += `🛒 *\`Penjual Terverifikasi:\`* ${res.user.ttSeller ? 'Ya' : 'Tidak'} ${sellerBadge}\n`;

    tek += `\n> ${global.wm}`;
    await m.reply(tek);
  } catch (error) {
    m.reply(`Terjadi kesalahan: ${error.message}`);
  }
};

handler.tags = ['tools'];
handler.help = ['tiktokstalk'];
handler.command = ['ttstalk','tiktokstalk']
handler.premium = false;

module.exports = handler;

async function stalk(user) {
  try {
    const url = await fetch(`https://tiktok.com/@${user}`, {
      headers: {
        'User-Agent': 'PostmanRuntime/7.32.2'
      }
    });
    const html = await url.text();
    const $ = cheerio.load(html);
    const data = $('#__UNIVERSAL_DATA_FOR_REHYDRATION__').text();
    const result = JSON.parse(data);
    if (result['__DEFAULT_SCOPE__']['webapp.user-detail'].statusCode !== 0) {
      return {
        status: 'error',
        message: 'User tidak ditemukan!',
      };
    }
    return result['__DEFAULT_SCOPE__']['webapp.user-detail']['userInfo'];
  } catch (err) {
    console.log(err);
    return { status: 'error', message: String(err) };
  }
}
