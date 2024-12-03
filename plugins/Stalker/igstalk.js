const cheerio = require('cheerio');
const fetch = require('node-fetch');

let handler = async (m, { hanz, text }) => {
  if (!text) throw 'Silakan masukkan username Instagram yang ingin Anda stalk!';
  
  let res = await igStalk(text);
  if (!res) throw 'Pengguna tidak ditemukan atau ada kesalahan saat mengambil data.';

  let caption = `
📸 *Profil Pengguna Instagram*

👤 *Nama:* ${res.name}
🔗 *Username:* ${res.username}
👥 *Followers:* ${res.followersH}
👤 *Following:* ${res.followingH}
📈 *Posts:* ${res.postsH}

📝 *Bio:*
${res.description || 'Tidak ada bio yang tersedia.'}
`.trim();

  if (res.profilePic) {
    return hanz.sendMessage(m.chat, { image: { url: res.profilePic }, caption }, { quoted: m });
  }
  
  m.reply(caption);
};

handler.help = ['igstalk'].map(v => v + ' <username>');
handler.tags = ['tools'];
handler.alias = ['igstalk', 'stalkig'];
handler.command = /^(igstalk|stalkig)$/i;

module.exports = handler;

async function igStalk(username) {
  username = username.replace(/^@/, '');
  const html = await (await fetch(`https://dumpor.com/v/${username}`)).text();
  const $$ = cheerio.load(html);
  
  const name = $$('div.user__title > a > h1').text().trim();
  const Uname = $$('div.user__title > h4').text().trim();
  const description = $$('div.user__info-desc').text().trim();
  const profilePic = $$('div.user__img').attr('style')?.replace("background-image: url('", '').replace("');", '');
  
  const row = $$('#user-page > div.container > div > div > div:nth-child(1) > div > a');
  const postsH = row.eq(0).text().replace(/Posts/i, '').trim();
  const followersH = row.eq(2).text().replace(/Followers/i, '').trim();
  const followingH = row.eq(3).text().replace(/Following/i, '').trim();
  
  const list = $$('ul.list > li.list__item');
  const posts = parseInt(list.eq(0).text().replace(/Posts/i, '').trim().replace(/\s/g, ''));
  const followers = parseInt(list.eq(1).text().replace(/Followers/i, '').trim().replace(/\s/g, ''));
  const following = parseInt(list.eq(2).text().replace(/Following/i, '').trim().replace(/\s/g, ''));
  
  return {
    name,
    username: Uname,
    description,
    postsH,
    posts,
    followersH,
    followers,
    followingH,
    following,
    profilePic
  };
}