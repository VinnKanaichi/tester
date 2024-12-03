 let handler = async (m, { setReply }) => {
  try {
    let userList = Object.entries(db.data.users);

    if (userList.length === 0) {
      setReply("Tidak ada user dalam database.");
    } else {
      let message = '*Daftar User:*\n';
      userList.forEach(([id, user], index) => {
        let name = user.name || "No Name";  // Menampilkan "No Name" jika nama tidak tersedia
        message += `${index + 1}. ${name} (${id})\n`;
      });
      setReply(message);
    }
  } catch (error) {
    setReply("Terjadi kesalahan saat memuat daftar user.");
    console.error(error);  // Mencatat error untuk debugging
  }
};

handler.help = ['listuser'];
handler.tags = ['settings'];
handler.command = ['listuser'];
handler.owner = true;

module.exports = handler;
