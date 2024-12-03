const fs = require('fs')
const toMs = require('ms')
const { WAMessageStubType, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia , generateWAMessage, areJidsSameUser, downloadMediaMessage, makeInMemoryStore } = require("baileys")

/**
 * Menambahkan pembelian panel.
 * @param {String} userId - ID pengguna WhatsApp.
 * @param {String} panelName - Nama panel yang dibeli.
 * @param {String} duration - Durasi aktif panel dalam format string (contoh: "1d" untuk 1 hari).
 * @param {Object} _dir - Database penyimpanan data.
 */
const addPanelPurchase = (userId, panelName, duration, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            position = i
        }
    })
    if (position !== null) {
        _dir[position].expired = Date.now() + toMs(duration)
    } else {
        const obj = { id: userId, panel: panelName, expired: Date.now() + toMs(duration) }
        _dir.push(obj)
    }
}

/**
 * Mendapatkan posisi data panel.
 * @param {String} userId - ID pengguna.
 * @param {Object} _dir - Database penyimpanan data.
 * @returns {Number} - Posisi data dalam database.
 */
const getPanelPosition = (userId, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            position = i
        }
    })
    return position
}

/**
 * Mendapatkan tanggal kedaluwarsa panel.
 * @param {String} userId - ID pengguna.
 * @param {Object} _dir - Database penyimpanan data.
 * @returns {Number} - Waktu kedaluwarsa dalam milidetik.
 */
const getPanelExpiration = (userId, _dir) => {
    let position = getPanelPosition(userId, _dir)
    return position !== null ? _dir[position].expired : null
}

/**
 * Mengecek apakah pengguna masih memiliki panel aktif.
 * @param {String} userId - ID pengguna.
 * @param {Object} _dir - Database penyimpanan data.
 * @returns {Boolean} - Status apakah pengguna memiliki panel aktif.
 */
const checkPanelActive = (userId, _dir) => {
    return getPanelPosition(userId, _dir) !== null
}

/**
 * Pengecekan otomatis masa aktif panel.
 * @param {object} conn - Koneksi WhatsApp (Baileys).
 * @param {Object} _dir - Database penyimpanan data.
 */
const expiredCheck = async (conn, _dir) => {
    let position = null
    Object.keys(_dir).forEach(async (i) => {
        if (Date.now() >= _dir[i].expired) {
            position = i
        }
    })
    if (position !== null) {
        const expiredPanel = _dir[position]
        const userId = expiredPanel.id
        const message = `Masa aktif panel Anda untuk ${expiredPanel.panel} sudah habis. Untuk memperpanjang, silakan hubungi admin.`

        // Kirim pesan ke pengguna yang masa aktif panelnya habis
        await conn.sendMessage(userId, { text: message })
        
        // Notifikasi ke owner
        await conn.sendMessage(`6281316643491@s.whatsapp.net`, { text: `Masa aktif panel untuk pengguna ${userId} dengan panel ${expiredPanel.panel} telah habis.` })
        
        // Hapus data panel yang kedaluwarsa
        _dir.splice(position, 1)
    }
}

/**
 * Mendapatkan semua ID pengguna panel.
 * @param {Object} _dir - Database penyimpanan data.
 * @returns {String[]} - Daftar ID pengguna.
 */
const getAllPanelUsers = (_dir) => {
    return _dir.map(panel => panel.id)
}

module.exports = {
    addPanelPurchase,
    getPanelExpiration,
    getPanelPosition,
    expiredCheck,
    checkPanelActive,
    getAllPanelUsers
}

// Watch untuk update otomatis
const { color } = require("./color")
const chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.bgGreen(color("[  UPDATE ]", "black")), chalk.white(`${__filename}`))
    delete require.cache[file]
    require(file)
})
