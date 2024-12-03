let handler = async (m, { setReply,sendThumb }) => {
  let teks = `
    Kebijakan dan Privasi, Syarat, Ketentuan dan Peraturan *yaemiko - md*

*Kebijakan & Privasi*
1. Bot tidak akan merekam data riwayat chat user.
2. Bot tidak akan menyebarkan nomor users.
3. Bot tidak akan menyimpan media yang dikirimkan oleh users.
4. Bot tidak akan menyalah gunakan data data users.
5. Owner berhak melihat data riwayat chat users.
6. Owner berhak melihat status users.
7. Owner dapat melihat riwayat chat, dan media yang dikirimkan users.
8. Data kalian aman 100% tersimpan ke dalam database *Mysql*

*Peraturan & Penggunaan*
1. Dilarang menelpon atau video call nomor bot.
2. Dilarang kirim berbagai bug, virtex, dll ke nomor bot.
3. Diharap keras melakukan spam dalam penggunaan bot.
4. Dilarang menculik bot secara illegal, untuk menambahkan silahkan hubungi owner.
5. Tidak menyalah gunakan fitur fitur bot.
6. Dilarang keras menggunakan fitur bot 18+ bagi yang bukan user Premium/bawah 18+

*Syarat & Ketentuan*
1. Bot akan keluar dari group otomatis jika waktu masa *Sewa* habis.
2. Bot dapat mem-ban users jika melakukan Spam
3. Bot *tidak akan bertanggungjawab atas apapun yang users lakukan terhadap fitur bot.*
4. Bot akan memberlakukan hukuman: block atau ban terhadap users yang melanggar peraturan.
5. Bot bertanggung jawab atas kesalahan fatal dalam Programing maupun owner.
  `;

  // Mengirimkan pesan dengan aturan dan ketentuan
  sendThumb('https://pomf2.lain.la/f/6w81jm7b.jpg',teks);
};

handler.help = ['rules']; // Perintah yang digunakan oleh pengguna
handler.tags = ['info']; // Kategori plugin
handler.command = /^rules$/i; // Regex untuk mencocokkan perintah

module.exports = handler;
