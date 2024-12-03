let handler = async (m, { setReply }) => {
  let data = global.db.data.others['runtime'];
  let time = (new Date - data.runtime) || 'lamanya'; // Menghitung waktu aktif bot
  
  // Fungsi untuk mengonversi waktu dalam milidetik ke format jam, menit, detik
  function clockString(ms) {
    let hours = Math.floor(ms / 3600000);
    let minutes = Math.floor((ms % 3600000) / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);
    return `${hours} jam, ${minutes} menit, ${seconds} detik`;
  }

  // Mengirimkan waktu aktif bot
  setReply(`⏰ Bot aktif selama ${clockString(time)}`);
};

handler.help = ['runtime']; // Perintah yang digunakan oleh pengguna
handler.tags = ['info']; // Kategori plugin
handler.command = /^runtime$/i; // Regex untuk mencocokkan perintah

module.exports = handler;
