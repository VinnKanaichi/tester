const fetch = require("node-fetch");
const axios = require ("axios");

let handler = async (m, { q, hanz, args, usedPrefix, command }) => {
  if (!q) return m.reply("Mau ngomong apa?");
  try {
    const url = `https://aemt.uk.to/openai?text=${q}`;
    
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        hanz.sendMessage(m.chat, { text:` ${gris}FROM AI${gris}\n*Result Dari* : ${q}\n\n${data.result}`}, { quoted: m });
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  } catch (Error) {
    Log(Error.toString());
  }
};
handler.help = ["chatgpt"];
handler.tags = ["internet", "ai", "gpt"];
handler.command = ["ai"];

module.exports = handler;