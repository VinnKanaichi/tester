const fs = require("fs");

let handler = async (m, { hanz, isOwner, isGroup, setReply, args }) => {
    let groupList = await hanz.groupFetchAllParticipating();
    let groups = Object.values(groupList); 

    // Mengecek apakah bot tergabung dalam grup
    if (groups.length === 0) {
        return setReply('Bot tidak tergabung dalam grup mana pun.');
    }

    // Jika tidak ada argumen, tampilkan daftar grup
    if (!args[0]) {
        let groupText = `Silahkan Di Pilih Ingin Broadcast ke Group Mana\nDaftar Grup yang Ditempati Bot:\n\n`;
        groups.forEach((group, index) => {
            groupText += `${index + 1}. ${group.subject}\n`;
        });
        groupText += `\nKetik nomor grup dan pesan yang ingin dikirim. Contoh: broadcast 1 Pesan saya.`;
        return setReply(groupText);
    }

    // Memproses nomor grup yang dipilih
    let groupIndex = parseInt(args[0]) - 1;
    if (isNaN(groupIndex) || groupIndex < 0 || groupIndex >= groups.length) {
        return setReply('Nomor grup tidak valid.');
    }

    // Mengambil pesan dari argumen
    let message = args.slice(1).join(' ');
    if (!message) return setReply('Silakan masukkan pesan yang ingin dikirim.');

    // Menyiapkan konteks untuk pesan
    let contextInfo = {
        externalAdReply: {
            showAdAttribution: true,
            renderLargerThumbnail: true,
            sourceUrl: "https://instagram.com/ehanzdhoanx",
            title: `${botName}`,
            body: `ᴀʀᴛɪꜰɪᴄɪᴀʟ ɪɴᴛᴇʟʟɪɢᴇɴᴄᴇ,ᴛʜᴇ ʙᴇɢɪɴɴɪɴɢ ᴛʜᴇ ʀᴏʙᴏᴛ ᴇʀᴀ`,
            mediaType: 1, 
            containsAutoReply: true,
            thumbnailUrl: "https://pomf2.lain.la/f/k6i4vxfs.jpg"
        }
    };

    // Membuat teks broadcast
    let textBc = `
*「 BROADCAST GROUP 」*
*Khusus untuk Grup:* _${groups[groupIndex].subject}_

────────────────────────
*📢 Pesan dari Owner:*
"${message}"
────────────────────────

Terima kasih telah menjadi bagian dari komunitas ini. Kami menghargai dukungan dan kebersamaan Anda di grup ini. Tetap semangat dan terus berkontribusi!

Salam hangat,  
Owner
`;

    try {
        await hanz.sendMessage(groups[groupIndex].id, { // Menggunakan ID grup yang dipilih
            video: fs.readFileSync('./stik/video.mp4'),
            caption: textBc, // Menggunakan caption untuk teks
            gifPlayback: true,
            contextInfo: contextInfo
        });
        setReply(`Berhasil mengirim pesan ke grup: ${groups[groupIndex].subject}`);
    } catch (error) {
        console.error('Error sending message:', error);
        setReply('Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.');
    }
};

handler.help = ['broadcast'];
handler.tags = ['owner'];
handler.command = ['broadcast'];
handler.owner = true;

module.exports = handler;