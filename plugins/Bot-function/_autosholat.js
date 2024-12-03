let handler = (m) => m;

handler.before = async function (m, { hanz, isPremium, isOwner, chatUpdate, setReply }) {
  // AUTO SHOLAT
  hanz.autoshalat = hanz.autoshalat ? hanz.autoshalat : {};
  
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? hanz.user.id : m.sender;
  let id = m.chat;

  // Jika chat sudah ada dalam autoshalat, jangan lakukan apa-apa
  if (id in hanz.autoshalat) {
    return false;
  }

  let jadwalSholat = {
    shubuh: '04:29',
    terbit: '05:44',
    dhuha: '08:00',
    dzuhur: '12:02',
    ashar: '15:15',
    magrib: '17:52',
    isya: '19:01',
  };

  // Mendapatkan waktu sekarang
  const datek = new Date((new Date).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta"
  }));
  const hours = datek.getHours();
  const minutes = datek.getMinutes();
  const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

  // Cek apakah waktu sekarang cocok dengan jadwal sholat
  for (let [sholat, waktu] of Object.entries(jadwalSholat)) {
    if (timeNow === waktu) {
      let caption = Ehztext(`Hai kak ${m.pushName},\nWaktu *${sholat}* telah tiba, ambilah air wudhu dan segeralah shalat🙂.\n\n*${waktu}*\n_untuk wilayah Tasikmalaya dan sekitarnya._`);

      // Set reply dan simpan ke dalam autoshalat untuk mencegah duplikasi
      hanz.autoshalat[id] = [
        setReply(caption),
        setTimeout(() => {
          delete hanz.autoshalat[m.chat]; // Menghapus chat ID setelah 57 detik
        }, 57000)
      ];
    }
  }
};

module.exports = handler;
