const axios = require('axios');
const cheerio = require('cheerio');

let handler = async (m, { text }) => {
    // Check if text is provided
    if (!text) return m.reply('Masukkan teks yang ingin diubah gaya!');

    // Call the styletext function with the provided text
    let anu = await styletext(text);
    
    // Prepare the response message
    let teks = `Gaya Teks dari "${text}":\n\n`;
    for (let i of anu) {
        teks += `*${i.name}* : ${i.result}\n\n`;
    }
    
    // Send the formatted response
    m.reply(teks);
};

// Function to fetch styled text from the external API
async function styletext(teks) {
    return new Promise((resolve, reject) => {
        axios.get('http://qaz.wtf/u/convert.cgi?text=' + encodeURIComponent(teks))
            .then(({ data }) => {
                let $ = cheerio.load(data);
                let hasil = [];
                
                $('table > tbody > tr').each(function (a, b) {
                    hasil.push({
                        name: $(b).find('td:nth-child(1) > span').text(),
                        result: $(b).find('td:nth-child(2)').text().trim()
                    });
                });

                resolve(hasil);
            })
            .catch(err => {
                console.error("Error fetching styled text:", err);
                reject(new Error('Could not fetch styled text.'));
            });
    });
}

// Command and help settings
handler.help = ['styletext <teks>'];
handler.tags = ['tools'];
handler.command = /^styletext$/i;

// Export the handler for use in other modules
module.exports = handler;
