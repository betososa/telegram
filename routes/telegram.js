var express = require('express');
var router = express.Router();
var telegram = require('../helpers/telegram.js');

router.post('/', function(req, res, next) {
  var update = req.body;
  console.log(update);
  var telegramCmd = body.text;
  var chat_id = telegramUpdate.message.chat.id;
  var reply_to_message_id = telegramUpdate.message.message_id;
  if (telegramCmd === '/hola') {
    telegram.sendMessage(chat_id, 'hola', reply_to_message_id);
  }
  res.json({ status: 'ok' });
});

module.exports = router;
