let handler = async (m, { hanz }) => {
  let __timers = new Date() - global.db.data.users[m.sender].lastmisi;
  let _timers = 3600000 - __timers;
  let order = global.db.data.users[m.sender].ojekk;
  let timers = clockString(_timers);
  let name = hanz.getName(m.sender);
  let user = global.db.data.users[m.sender];
  let id = m.sender;
  let kerja = "Ojek";
  hanz.misi = hanz.misi ? hanz.misi : {};
  if (id in hanz.misi) {
    hanz.reply(
      m.chat,
      `Selesaikan Misi ${conn.misi[id][0]} Terlebih Dahulu`,
      m
    );
    throw false;
  }
  if (new Date() - global.db.data.users[m.sender].lastmisi > 3600000) {
    let randomaku4 = Math.floor(Math.random() * 10);
    let randomaku5 = Math.floor(Math.random() * 10);

    let rbrb4 = randomaku4 * 100000;
    let rbrb5 = randomaku5 * 1000;

    var dimas = `
🚶⬛⬛⬛⬛⬛⬛⬛⬛⬛
⬛⬜⬜⬜⬛⬜⬜⬜⬛⬛
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
🏘️🏘️🏘️🏘️🌳  🌳 🏘️       🛵
✔️ Mendapatkan orderan....
`.trim();

    var dimas2 = `
🚶🛵⬛⬛⬛⬛⬛⬛⬛⬛
⬛⬜⬜⬜⬛⬜⬜⬜⬛⬛
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
🏘️🏘️🏘️🏘️🌳  🌳 🏘️
➕ Mengantar ke tujuan....
`.trim();

    var dimas3 = `
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
⬛⬜⬜⬛⬛⬜⬜⬜⬛⬛
⬛⬛⬛⬛⬛⬛⬛🛵⬛⬛
🏘️🏘️🏘️🏘️🌳  🌳 🏘️
➕ Sampai di tujuan....
`.trim();

    var dimas4 = `
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
⬛⬜⬜⬛⬛⬜⬜⬜⬛⬛
⬛⬛⬛⬛⬛⬛⬛🛵⬛⬛
🏘️🏘️🏘️🏘️🌳  🌳 🏘️ 🚶
➕ 💹Menerima gaji....
`.trim();

    var hsl = `
*—[ Hasil Ngojek ${name} ]—*
➕ 💹 Uang = [ ${rbrb4} ]
➕ ✨ Exp = [ ${rbrb5} ]
➕ 😍 Order Selesai = +1
➕ 📥Total Order Sebelumnya : ${order}
`.trim();

    user.money += rbrb4;
    user.exp += rbrb5;
    user.ojekk += 1;

    hanz.misi[id] = [
      kerja,
      setTimeout(() => {
        delete conn.misi[id];
      }, 27000),
    ];

    setTimeout(() => {
      m.reply(hsl);
    }, 27000);

    setTimeout(() => {
      m.reply(dimas4);
    }, 25000);

    setTimeout(() => {
      m.reply(dimas3);
    }, 20000);

    setTimeout(() => {
      m.reply(dimas2);
    }, 15000);

    setTimeout(() => {
      m.reply(dimas);
    }, 10000);

    setTimeout(() => {
      m.reply("🔍Mencari pelanggan.....");
    }, 0);
    user.lastmisi = new Date() * 1;
  } else
    m.reply(
      `Silahkan Menunggu Selama ${timers}, Untuk Menyelesaikan Misi Kembali`
    );
};
handler.tags = ["rpg"];
handler.command = /^(ojek)$/i;
handler.level = 10;
handler.register = true;
handler.group = true;
handler.rpg = true;
module.exports = handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}
