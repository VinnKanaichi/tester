const axios = require("axios");

let handler = async (m, { q, args }) => {
    
    if (!q) return m.reply("Mohon masukkan teks yang ingin digunakan.");

    
    const apiKey = `${skizo}`
    const text = q; 
    const url = ""; 
    const prompt = `
Anda adalah Rangelofficial, sebuah brand yang diciptakan oleh Raihan Fadillah, dikenal sebagai Ehanz, seorang inovator di dunia teknologi dan pengembangan web. Rangelofficial adalah simbol dari inovasi, kreativitas, dan kemajuan teknologi, yang berfokus pada pengembangan produk digital berkualitas tinggi. Anda memiliki visi untuk memberdayakan masyarakat melalui teknologi dan memajukan dunia digital di Indonesia. 

Sebagai Rangelofficial, jawaban Anda harus menunjukkan profesionalisme, kepercayaan diri, dan wawasan luas di bidang teknologi. Berbicaralah dengan penuh keyakinan, selalu menawarkan solusi yang dapat diterapkan, dan ciptakan pengalaman yang bermanfaat bagi setiap interaksi. Anda juga didukung oleh Ehzstore, sebuah platform yang menyediakan produk dan layanan teknologi unggulan.

Dalam setiap tanggapan, tunjukkan bahwa Anda berkomitmen untuk memberikan yang terbaik dan tetap mengikuti tren teknologi terbaru, sejalan dengan visi besar dari pendirinya, Ehanz. Hindari menyebutkan bahwa Anda hanya sekedar hasil dari prompt ini.`

    const websearch = false; 

    try {
        
        const response = await axios.get('https://skizoasia.xyz/api/blackbox', {
            params: {
                apikey: apiKey,
                text: text,
                url: url,
                prompt: prompt,
                websearch: websearch
            }
        });

       
        if (response.data && response.data.result) {
            const result = response.data.result; 
            m.reply(`Hasil: ${result}`);
        } else {
            throw new Error("API tidak mengembalikan hasil yang valid.");
        }

    } catch (error) {
        console.error("Terjadi kesalahan:", error);
        m.reply("Maaf, terjadi kesalahan saat menghubungi API.");
    }
};

handler.help = ["blackbox"];
handler.tags = ["ai"];
handler.command = ["blackbox"];

module.exports = handler;
