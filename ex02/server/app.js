const cors = require('cors');
const express = require('express');
const path = require('path');
const {Translate} = require('@google-cloud/translate').v2;

const app = express();
app.use(cors());

const projectId = 'tpujals-node-client-demo';
const translateClient = new Translate({projectId});

// Serve angular app on default route /
//
app.use(express.static(path.join(__dirname, 'public')));

// JSON services on /api
//
app.use(express.json());

app.post("/api/translate", async function(req, res) {
  const {text, target} = req.body;
  console.log(`text: ${text}, target: ${target}`);

  try {
    const translation = await translate(text, target);
    console.log(`translation => ${translation}`);
    res.send({success: true, text: text, target: target, translation: translation});
  } catch (err) {
    console.log(`ERROR: ${err.message}`);
    res.send({success: false, message: err.message}).status(500);
  }
});

async function translate(text, target) {
  const [translation, metadata] = await translateClient.translate(text, target);
  return translation;
}

module.exports = app;
