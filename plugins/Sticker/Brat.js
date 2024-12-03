const fs = require('fs');
const { Sticker, StickerTypes } = require("wa-sticker-formatter");

const handler = async (m, { hanz, args, text, usedPrefix, command }) => {
    text = text || (m.quoted && (m.quoted.text || m.quoted.caption || m.quoted.description));
    if (!text) throw `*• Example :* ${usedPrefix + command} *[text]*`;

    
    function getRandomFile(extension) {
        return `${Math.floor(Math.random() * 10000)}${extension}`;
    }

    async function makeSticker(media) {
        let sticker = new Sticker(media, {
            pack: packName,
            author: authorName,
            type: StickerTypes.FULL,
            categories: ['🤩', '🎉'],
            id: '12345',
            quality: 70,
            background: '#FFFFFF00'
        });

        let outputFile = getRandomFile(".webp");
        await sticker.toFile(outputFile);
        let stickerBuffer = fs.readFileSync(outputFile);

        await hanz.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m });
        fs.unlinkSync(outputFile); // Hapus file sementara setelah mengirim
    }

    try {
        let res = `https://mxmxk-helper.hf.space/brat?text=${encodeURIComponent(text)}`;
        await makeSticker(res);
    } catch (e) {
        console.log(e);
    }
};

handler.command = handler.help = ['brat'];
handler.tags = ['sticker'];
module.exports = handler;
