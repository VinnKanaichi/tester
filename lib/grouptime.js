const fs = require('fs-extra');
const moment = require("moment-timezone");
const chalk = require("chalk");

// Fungsi untuk membuka grup sesuai waktu yang ditentukan
const open = (name, id, clock, _dir) => {
  let position = _dir.findIndex((entry) => entry.id === id);
  
  if (position !== -1) {
    _dir[position].opened = false;
    _dir[position].timeOpen = clock;
  } else {
    _dir.push({
      name: name,
      id: id,
      opened: false,
      closed: false,
      timeOpen: clock,
      timeClose: ''
    });
  }
};

// Fungsi untuk menutup grup sesuai waktu yang ditentukan
const close = (name, id, clock, _dir,m) => {
  if (!Array.isArray(_dir)) {
   m.reply("Error: setTime is not defined or is not an array");
    return;
  }

  let position = _dir.findIndex((entry) => entry.id === id);

  if (position !== -1) {
    _dir[position].closed = false;
    _dir[position].timeClose = clock;
  } else {
    _dir.push({
      name: name,
      id: id,
      opened: false,
      closed: false,
      timeOpen: '',
      timeClose: clock,
    });
  }
};

// Fungsi yang dijalankan secara periodik untuk memeriksa waktu buka/tutup grup
const running = async ( _dir,hanz) => {
  let setTime = db.data.others['setTime'];
  if (!setTime) db.data.others['setTime'] = [];

  if (setTime.length > 0) {
    setInterval(async () => {
      const time = moment().tz('Asia/Jakarta').format('HH:mm');
      for (let i of setTime) {
        if (i.timeOpen && time === i.timeOpen && !i.opened) {
          i.opened = true;

          const getGroups = await hanz.groupFetchAllParticipating();
          const groupIds = Object.keys(getGroups);

          if (!groupIds.includes(i.id)) {
            setTime.splice(setTime.indexOf(i), 1);
            console.log("Menghapus pengaturan waktu otomatis pada grup yang tidak ditemukan.");
          } else {
            const text = `Waktu yang ditentukan telah tiba. Grup akan dibuka pada ${i.timeOpen} WIB dan akan ditutup pada ${i.timeClose}.`;
            await hanz.groupSettingUpdate(i.id, 'not_announcement');
            await hanz.sendMessage(i.id, { text });
          }

        } else if (i.timeClose && time === i.timeClose && !i.closed) {
          i.closed = true;

          const getGroups = await hanz.groupFetchAllParticipating();
          const groupIds = Object.keys(getGroups);

          if (!groupIds.includes(i.id)) {
            setTime.splice(setTime.indexOf(i), 1);
            console.log("Menghapus pengaturan waktu otomatis pada grup yang tidak ditemukan.");
          } else {
            const text = `Waktu yang ditentukan telah tiba. Grup akan ditutup pada ${i.timeClose} WIB dan dibuka pada ${i.timeOpen}.`;
            await hanz.groupSettingUpdate(i.id, 'announcement');
            await hanz.sendMessage(i.id, { text });
          }
        }

        // Reset status `opened` dan `closed`
        if (time !== i.timeOpen) i.opened = false;
        if (time !== i.timeClose) i.closed = false;
      }
    }, 1000);
  }
};

// Fungsi untuk menghapus pengaturan buka/tutup otomatis
const del = (userId, _data) => {
  if (!Array.isArray(_data)) {
    console.error("Error: _data tidak valid");
    return false;
  }

  const position = _data.findIndex((entry) => entry.id === userId);

  if (position !== -1) {
    _data.splice(position, 1);
    return true;
  }
  return false;
};

// Fungsi untuk mendapatkan waktu buka atau tutup grup berdasarkan ID grup
const getOpen = (userId, _dir) => {
  const group = _dir.find((entry) => entry.id === userId);
  return group ? group.timeOpen : null;
};

const getClose = (userId, _dir) => {
  const group = _dir.find((entry) => entry.id === userId);
  return group ? group.timeClose : null;
};

// Fungsi untuk memeriksa apakah grup tertentu ada dalam pengaturan
const check = (userId, _dir) => {
  return _dir.some((entry) => entry.id === userId);
};

module.exports = {
  open,
  close,
  getOpen,
  getClose,
  running,
  check,
  del
};

// Pantau perubahan pada file dan perbarui otomatis jika ada perubahan
const file = __filename;
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.bgGreen(chalk.black("[  UPDATE ]")), chalk.white(file));
  delete require.cache[require.resolve(file)];
  require(file);
});
