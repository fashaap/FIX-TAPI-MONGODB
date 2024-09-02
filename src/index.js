const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookies = require('cookie-parser');
const cors = require('cors');

const { makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys");
const pino = require('pino');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookies());
app.use(cors());

const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("Database is connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const authAdmin = require("./router/admin/router.admin")
app.use("/api/v1/auth/admin", authAdmin);

const authUser = require("./router/user/router.user")
app.use("/api/v1/auth/users", authUser)

const ticket = require("./router/ticket/router.ticket");
app.use("/api/v1/tickets", ticket)

const location = require("./router/location/router.location")
app.use("/api/v1/location", location)

const locationHistory = require("./router/location/router.locationHistory")
app.use("/api/v1/location-history", locationHistory)

const notification = require("./router/notification/router.notification")
app.use("/api/v1/notifications", notification)

const questionnaire = require("./router/questionnaire/router.questionnaire")
app.use("/api/v1/questionnaire", questionnaire)

const report = require("./router/report/router.report")
app.use("/api/v1/report", report)

const informationUpdate = require("./router/information/router.informationUpdate")
app.use("/api/v1/information/update", informationUpdate)


async function connectToWhatsapp() {
  try {
    const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys")
    if (!state) throw new Error('Auth state not found')

    sock = makeWASocket({
      auth: state,
      printQRInTerminal: true,
      browser: ["windows", "chrome", "11"],
      logger: pino({ level: "silent" })
    });

    sock.ev.on('creds.update', (newCreds) => {
      if (newCreds) {
        saveCreds();
      }
    });

    sock.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect } = update;
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (connection === 'open') {
        console.log('Connection opened');
      } else if (connection === 'close' && shouldReconnect) {
        console.log(`Connection closed. Reconnecting`);
        connectToWhatsapp();
      } else {
        console.log(`Connection closed. Not reconnecting`);
      }
    })
  } catch (err) {
    console.error('Failed to connect to WhatsApp:', err);
  }
}

connectToWhatsapp();

app.post('/api/v1/bot/sendMessage', async (req, res) => {
  const { noPhone, message } = req.body;
  const { key } = req.query;

  let id = "62" + noPhone.toString(1).substring(1) + "@s.whatsapp.net";

  try {
    if (key === process.env.SECRET_KEY_BOT) {
      if (!sock) {
        throw new Error('WhatsApp connection not established');
      }

      const dateFormat = new Date().toLocaleString('id-ID')

      console.log({
        no: noPhone,
        message: message,
        status: 200,
        date: dateFormat
      });

      await sock.sendMessage(id, { text: message })

      res.status(200).json({ no: noPhone, message: message, status: 200, date: dateFormat });
    } else {
      res.status(400).json({ error: 'Invalid key', status: 400 });
    }
  } catch (err) {
    console.error('Failed to send message:', err);
    res.status(500).json({ error: err.toString() });
  }
});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
  })
})
