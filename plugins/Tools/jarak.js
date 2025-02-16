const axios = require("axios");
const cheerio = require("cheerio");

let handler = async (m, { q, hanz,setReply }) => {
    if (!q) return setReply("Masukkan query");
    if (!q.includes("|")) return setReply("Contoh: jogja|jakarta");

    let Dari = q.split("|")[0];
    let Ke = q.split("|")[1];

    async function jarak(dari, ke) {
        let url = `https://www.google.com/search?q=${encodeURIComponent("jarak " + dari + " ke " + ke)}&hl=id`;
        let { data } = await axios.get(url);
        let $ = cheerio.load(data);
        let img = data.split("var s='")[1].split("'")[0];
        let res = {
            result: {
                img: /^data:.*?\/.*?;base64,/i.test(img)
                    ? Buffer.from(img.split(",")[1], "base64")
                    : "",
                desc: $("div.BNeawe.deIvCb.AP7Wnd").text(),
            },
        };
        return res;
    }

    let nana = await jarak(Dari, Ke);
    let image = nana.result.img;
    let caption = `*Google Maps* \n\n${nana.result.desc}`;
    
    // Mengganti conn dengan hanz
    hanz.sendMessage(m.chat, { image, caption }, { quoted: m });
};

// Ekspor handler
handler.help = ["search"];
handler.tags = ["search"];
handler.command = ["jarak"];

module.exports = handler;