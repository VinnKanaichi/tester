const fs = require("fs");
const fse = require("fs-extra");

let handler = async (m, { hanz,  q, setReply }) => {
  const imagenya = JSON.parse(fs.readFileSync('./json/image.json'));

  // Check permissions
  if (!m.key.fromMe && !m.isOwner) return setReply("Only the owner can use this command.");
  const quoted = m.quoted ? m.quoted : m;

  // Check if it's an image and if there's a provided name
  const isQuotedImage = quoted && quoted.mtype === 'imageMessage';
  if (!isQuotedImage) return setReply("Reply to an image.");
  if (!q) return setReply("Please provide a name for the image.");

  try {
    // Download the image and save it
    let downloadedImage = await hanz.downloadAndSaveMediaMessage(quoted);
    imagenya.push(q);
    await fse.copy(downloadedImage, `./temp/image/${q}.jpg`);
    
    // Update JSON file
    fs.writeFileSync('./json/image.json', JSON.stringify(imagenya, null, 2));
    
    // Delete temporary downloaded image
    fs.unlinkSync(downloadedImage);

    setReply(`Successfully added image with name *${q}*`);
  } catch (error) {
    console.error(error);
    setReply("Failed to add the image.");
  }
};

handler.command = ["addimage"];
handler.owner = true;

module.exports = handler;
