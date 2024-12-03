let handler = (m) => m;

handler.before = async function (m, { hanz }) {
  hanz.bj = hanz.bj || {};
  if (!(m.sender in hanz.bj)) return;
  if (m.isBaileys) return;

  const cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  const calculateTotal = (cardArray) => {
    let total = 0;
    let hasAce = false;

    for (let card of cardArray) {
      if (card === "A") {
        total += 11;
        hasAce = true;
      } else if (["K", "Q", "J"].includes(card)) {
        total += 10;
      } else {
        total += parseInt(card);
      }
    }

    if (hasAce && total > 21) {
      total -= 10;
    }

    return total;
  };

  const pickCard = () => cards[Math.floor(Math.random() * cards.length)];

  let bjData = hanz.bj[m.sender];
  let { playerCards, computerCards, playerTotal, computerTotal, bet, timeout } = bjData;

  const sendResultMessage = async (result, playerTotal, computerTotal) => {
    const message = `*• B L A C K J A C K - R E S U L T*

╭── •
│ ◦ *Your Cards:* ${playerCards.join(", ")}
│ ◦ *Your Total:* ${playerTotal}
├─ •
│ ◦ *Computer Cards:* ${computerCards.join(", ")}
│ ◦ *Computer Total:* ${computerTotal}
╰── •

${result}`;

    hanz.reply(m.chat, message, m, {
      contextInfo: {
        externalAdReply: {
          title: "C A S I N O",
          body: "",
          thumbnailUrl: "https://telegra.ph/file/1703cff0a758d0ef8f84f.png",
          sourceUrl: "https://example.com",
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    });
  };

  try {
    const input = m.text.toLowerCase();

    if (/^hit$/i.test(input)) {
      // Tambahkan kartu baru ke tangan pemain
      let newCard = pickCard();
      playerCards.push(newCard);
      playerTotal = calculateTotal(playerCards);

      if (playerTotal > 21) {
        // Pemain kalah
        await sendResultMessage(
          `*You lose! Your total exceeds 21.*\n*-${bet} money*`,
          playerTotal,
          computerTotal
        );
        global.db.data.users[m.sender].money -= bet;
        clearTimeout(timeout);
        delete hanz.bj[m.sender];
      } else if (playerTotal === 21) {
        // Pemain menang
        await sendResultMessage(
          `*You win!*\n*+${bet} money*`,
          playerTotal,
          computerTotal
        );
        global.db.data.users[m.sender].money += bet;
        clearTimeout(timeout);
        delete hanz.bj[m.sender];
      } else {
        // Kirim status terkini
        const message = `*• B L A C K J A C K*

╭── •
│ ◦ *Your Cards:* ${playerCards.join(", ")}
│ ◦ *Your Total:* ${playerTotal}
├─ •
│ ◦ *Computer Cards:* ${computerCards[0]}
│ ◦ *Bet:* ${bet}
╰── •

Type *hit* to draw another card.
Type *stand* to end your turn.`;

        hanz.reply(m.chat, message, m, {
          contextInfo: {
            externalAdReply: {
              title: "C A S I N O",
              body: "",
              thumbnailUrl: "https://telegra.ph/file/1703cff0a758d0ef8f84f.png",
              sourceUrl: "https://example.com",
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        });
      }
    } else if (/^stand$/i.test(input)) {
      // Komputer bermain hingga total >= 18
      while (computerTotal < 18) {
        let newCard = pickCard();
        computerCards.push(newCard);
        computerTotal = calculateTotal(computerCards);
      }

      // Tentukan hasil
      if (computerTotal > 21) {
        await sendResultMessage(
          `*You win! Computer's total exceeds 21.*\n*+${bet} money*`,
          playerTotal,
          computerTotal
        );
        global.db.data.users[m.sender].money += bet;
      } else if (playerTotal > computerTotal) {
        await sendResultMessage(
          `*You win!*\n*+${bet} money*`,
          playerTotal,
          computerTotal
        );
        global.db.data.users[m.sender].money += bet;
      } else if (playerTotal < computerTotal) {
        await sendResultMessage(
          `*You lose!*\n*-${bet} money*`,
          playerTotal,
          computerTotal
        );
        global.db.data.users[m.sender].money -= bet;
      } else {
        await sendResultMessage(
          "The result is a DRAW!",
          playerTotal,
          computerTotal
        );
      }

      clearTimeout(timeout);
      delete hanz.bj[m.sender];
    }
  } catch (e) {
    console.error(e);
    hanz.reply(m.chat, "An error occurred while processing your choice.", m);
    clearTimeout(timeout);
    delete hanz.bj[m.sender];
  }
};

 




handler.command = ["blackjack", "bj"];
handler.tags = ["game"];
handler.help = ["blackjack <bet>"];
handler.register = true;

module.exports = handler;






