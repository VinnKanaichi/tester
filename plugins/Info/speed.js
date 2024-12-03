let handler = async (m, { setReply }) => {
  // Mengukur waktu untuk menghitung latensi
  let start = new Date().getTime();
  
  // Kirim balasan sementara untuk mengukur latensi
  //await setReply('⏳ Menghitung kecepatan...');
  
  // Menghitung latensi setelah balasan dikirim
  let end = new Date().getTime();
  let latensi = (end - start) / 1000; // Menghitung latensi dalam detik

  // Mengirimkan hasil latensi
  setReply(`Speed: ${latensi.toFixed(4)} Second`);
};

handler.help = ['speed']; // Perintah yang digunakan oleh pengguna
handler.tags = ['info']; // Kategori plugin
handler.command = /^speed$/i; // Regex untuk mencocokkan perintah

module.exports = handler;
