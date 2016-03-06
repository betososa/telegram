var express = require('express');
var router = express.Router();
var telegram = require('../helpers/telegram.js');

router.post('/', function(req, res, next) {
  var update = req.body;
  console.log('----------');
  console.log(update);
  console.log('----------');
  var telegramCmd = update.message.text;
  console.log(telegramCmd);
  var chat_id = update.message.chat.id;
  var reply_to_message_id = update.message.message_id;
  if (telegramCmd === '/hola') {
    console.log('----------*************************');
    telegram.sendMessage(chat_id, 'hola');
    //res.json({ status: 'ok' });
  }
  res.json({ status: 'ok' });
});

module.exports = router;
