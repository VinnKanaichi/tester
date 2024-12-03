// Import modul _time dari "grouptime.js" untuk mengakses fungsi open/close otomatis grup
const { open, close, getOpen, getClose, running, check, getIndex, del } = require("../../lib/grouptime");

let handler = async (m, { q, hanz, isOwner, command, setReply }) => {
  // Ambil data setTime dari database, pastikan setTime adalah array untuk menghindari error.
  db.data.others["setTime"] = db.data.others["setTime"] || []; // Set default ke array jika belum ada
  const setTime = db.data.others["setTime"];

  // Pastikan perintah ini hanya dijalankan di dalam grup
  if (!m.isGroup) return setReply(mess.only.group);

  // Pastikan admin yang menjalankan perintah (aktifkan pengecekan jika diperlukan)
  // if(!isGroupAdmins) return setReply(mess.only.admin)

  // Pastikan pengguna memasukkan waktu dengan benar (q adalah input waktu dari pengguna)
  if (!q) return setReply("Masukan angka jam, contoh 23:00/23.00");
  if (!q.includes(".")) return setReply("Masukan angka jam, contoh 23.00");

  // Ubah format waktu pengguna dari "HH.MM" ke "HH:MM" (mengganti titik dengan titik dua)
  let waktu = q.replace(".", ":");

  // Panggil fungsi close untuk menyimpan pengaturan waktu tutup otomatis grup ke dalam database
  close(m.groupName, m.from, waktu, setTime);

  // Kirim pesan konfirmasi bahwa pengaturan waktu tutup otomatis berhasil
  setReply(`Berhasil mensetting waktu group di tutup setiap jam ${q}`);
};

// Informasi tag dan parameter handler
handler.tags = ["admin"]; // Menyatakan bahwa ini adalah perintah admin
handler.command = ["setclose"]; // Nama perintah yang bisa digunakan
handler.group = true; // Hanya bisa digunakan di grup
handler.admin = true; // Hanya bisa digunakan oleh admin grup

// Ekspor handler agar bisa diakses bot utama
module.exports = handler;
 