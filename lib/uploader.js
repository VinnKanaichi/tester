let axios = require('axios')
let BodyForm = require('form-data')
let { fromBuffer } = require('file-type')
let fetch = require('node-fetch')
let fs = require('fs')
let cheerio = require('cheerio')
const FormData = require('form-data');




function TelegraPh (Path) {
	return new Promise (async (resolve, reject) => {
		if (!fs.existsSync(Path)) return reject(new Error("File not Found"))
		try {
			const form = new BodyForm();
			form.append("file", fs.createReadStream(Path))
			const data = await  axios({
				url: "https://telegra.ph/upload",
				method: "POST",
				headers: {
					...form.getHeaders()
				},
				data: form
			})
			return resolve("https://telegra.ph" + data.data[0].src)
		} catch (err) {
			return reject(new Error(String(err)))
		}
	})
}


 async function FileUgu(filePath) {
    try {
        // Log file path (debugging)
        console.log("File path:", filePath);

        // Membuat form data dengan file yang diunggah
        let data = new FormData();
        data.append("files[]", fs.createReadStream(filePath));

        // Mengirim permintaan POST ke Uguu dengan `await`
        let response = await fetch("https://uguu.se/upload.php", {
            method: "POST",
            body: data
        });

        // Mengembalikan hasil sebagai JSON
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error in FileUgu:", error);
        throw error;
    }
}

async function webp2mp4File(path) {
  const form = new BodyForm();
  form.append('new-image-url', '');
  form.append('new-image', fs.createReadStream(path));

  try {
    const { data } = await axios.post('https://s6.ezgif.com/webp-to-mp4', form, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
      },
    });

    const bodyFormThen = new BodyForm();
    const $ = cheerio.load(data);
    const file = $('input[name="file"]').attr('value');
    bodyFormThen.append('file', file);
    bodyFormThen.append('convert', "Convert WebP to MP4!");

    const { data: secondData } = await axios.post('https://ezgif.com/webp-to-mp4/' + file, bodyFormThen, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`,
      },
    });

    const $2 = cheerio.load(secondData);
    const result = 'https:' + $2('div#output > p.outfile > video > source').attr('src');

    return {
      status: true,
      message: "Created By Zetsuboxygen",
      result: result
    };
  } catch (err) {
    throw err;
  }
}

				 
async function floNime(medianya, options = {}) {
const { ext } = await fromBuffer(medianya) || options.ext
        var form = new BodyForm()
        form.append('file', medianya, 'tmp.'+ext)
        jsonnya = await fetch('https://flonime.my.id/upload', {
                method: 'POST',
                body: form
        })
        .then((response) => response.json())
              .then((result) => {
                  return result
              })
              .catch(e => {
                  return e
              })
        return jsonnya
}

module.exports = { TelegraPh, FileUgu, webp2mp4File, floNime }
