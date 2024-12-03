const fetch = require("node-fetch");

let handler = async (m, { q, hanz }) => {
  if (!q) return m.reply("Tolong berikan kata kunci pencarian.");
m.reply('Sedamg Mencari')
  try {
    // Generate the Google search URL
    const url = `https://aemt.uk.to/googlesearch?query=${encodeURIComponent(q)}`;

    // Fetch the search results from the URL
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Get the JSON data from the response
    const data = await response.json();

    // Check if there are results
    if (data.result && data.result.length > 0) {
      // Format the results for sending
      let resultsText = `*Hasil Pencarian untuk: ${q}*\n\n`;
      data.result.forEach((result, index) => {
        if (result.link) { // Only include results with a valid link
          resultsText += `${index + 1}. *${result.title}*\n`;
          resultsText += `🔗 Link: ${result.link}\n`;
          resultsText += `${result.description}\n\n`;
        }
      });

      // Send the results to the user
      await hanz.sendMessage(m.chat, { text: resultsText }, { quoted: m });
    } else {
      m.reply("Tidak ada hasil ditemukan untuk pencarian ini.");
    }
  } catch (error) {
    // Handle errors and provide feedback to the user
    m.reply("Terjadi kesalahan saat memproses permintaan.");
    console.error("Error:", error.message); // Log error for debugging
  }
};

handler.help = ["googlesearch", "search"];
handler.tags = ["internet", "search"];
handler.command = ["googlesearch", "google"]; // Command to trigger the feature

module.exports = handler;
