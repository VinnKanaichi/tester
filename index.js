const chalk = require("chalk");
const axios = require("axios");
const { fileURLToPath } = require("url");
const cluster = require("cluster");
const { join, dirname } = require("path");
const fs = require('fs-extra');
const Readline = require("readline");
//const dotenv = require('dotenv');
const express = require("express");

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

//const __dirname = dirname(fileURLToPath(require.main.filename)); // CommonJS equivalent for __dirname
const app = express();
const rl = Readline.createInterface(process.stdin, process.stdout);
const PORT = process.env.PORT || 4000;
const HOST = '0.0.0.0';

/*app.all('/', (req, res) => {
  let html = fs.readFileSync('./index.html', 'utf-8');
  res.end(html);
});

app.listen(PORT, HOST, () => {
  console.log(chalk.green(`🌐 Port ${PORT} is open`));
  console.log(chalk.green(`🌐 Keep Alive on`));
});

dotenv.config();*/

let error = 0;
let isRunning = false;

/**
 * Start a js file
 * @param {String} file `path/to/file`
 */
function start(file) {
  if (isRunning) return;
  isRunning = true;
  let args = [join(__dirname, file), ...process.argv.slice(2)];

  cluster.setupMaster({
    exec: join(__dirname, file),
    args: args.slice(1),
  });

  let p = cluster.fork();
  p.on("message", async (data) => {
    switch (data) {
      case "reset":
        console.log("saatnya reset");
        p.process.kill();
        isRunning = false;
        start.apply(this, arguments);
        break;
      case "null":
        p.process.kill();
        isRunning = false;
        start.apply(this, arguments);
        console.log(chalk.yellowBright.bold(`System error total: ${error}`));
        break;
      case "SIGKILL":
        p.process.kill();
        isRunning = false;
        start.apply(this, arguments);
        break;
        case "SIGTERM":
        p.process.kill();
        isRunning = false;
        start.apply(this, arguments);
        break;
      case "uptime":
        p.send(process.uptime());
        break;
    }
  });

  // Exit handling
  p.on("exit", async (_, code) => {
    console.error(chalk.red(`🛑 Exited with code: ${code}`));
    console.error(chalk.red(`❌ Script will restart...`));

    if (error > 4) {
      console.log(chalk.yellowBright.bold(`Terjadi error lebih dari ${error} kali, system di hentikan selama satu jam`));

      setInterval(async () => {
        error = 0;
        p.process.kill();
        isRunning = false;
        start.apply(this, arguments);
        console.log(chalk.yellowBright.bold(`System error telah di reset, total system error ${error}`));
      }, 60000 * 60);
    } else if (error < 5) {
      setInterval(async () => {
        error = 0;
      }, 60000 * 5);

      if (code == null) {
        error += 1;
        p.process.kill();
        isRunning = false;
        start.apply(this, arguments);
        console.log(chalk.yellowBright.bold(`System error total: ${error}`));
      } else if (code == "SIGKILL") {
        p.process.kill();
        isRunning = false;
        start.apply(this, arguments);
      } else if (code == "SIGBUS") {
        p.process.kill();
        isRunning = false;
        start.apply(this, arguments);
      } else if (code == "SIGABRT") {
        p.process.kill();
        isRunning = false;
        start.apply(this, arguments);
      } else if (code === 0) {
        error += 1;
        p.process.kill();
        isRunning = false;
        start.apply(this, arguments);
        console.log(chalk.yellowBright.bold(`System error total: ${error}`));
      }
    }
    isRunning = false;
  });

  // UnhandledRejection handling
  p.on("unhandledRejection", async () => {
    console.error(chalk.red(`❌ Unhandled promise rejection. Script will restart...`));
    await sleep(10000);
    error += 1;
    p.process.kill();
    isRunning = false;
    start.apply(this, arguments);
    console.log(chalk.yellowBright.bold(`System error total: ${error}`));
  });

  // Error handling
  p.on("error", async (err) => {
    console.error(chalk.red(`❌ Error: ${err}`));
    await sleep(10000);
    error += 1;
    p.process.kill();
    isRunning = false;
    start.apply(this, arguments);
  });
}

start("main.js");

// KEEP ALIVE
function keepAlive() {
  const url = `https://a7189f57-1f15-4060-b97e-853222c15d2e-00-uy10zij1nl6y.teams.replit.dev`;
  if (/(\/\/|\.)undefined\./.test(url)) return;
  setInterval(async () => {
    let response = await axios.get(url);
    if (error < 5) console.log(chalk.yellowBright.bold('Server wake-up! --', response.status));
  }, 1000 * 60);
}
