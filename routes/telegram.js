var express = require('express');
var router = express.Router();
var telegram = require('../helpers/telegram.js');

var caption = require('caption');
var multer = require('multer');
var upload = multer({ dest: './uploads/' });

var gcloud = require('gcloud');

var gcs = gcloud.storage({
  projectId: 'missyapp-1242',
  keyFilename: './config/missyapp-c13275e43cdc.json'
});

var bucket = gcs.bucket('missyappbucket');

router.post('/', function(req, res, next) {
  var update = req.body;
  var telegramCmd = update.message.text;
  console.log(telegramCmd);
  var chat_id = update.message.chat.id;
  var reply_to_message_id = update.message.message_id;
  if (telegramCmd === '/hola') {
    telegram.sendMessage(chat_id, 'hola');
  }
  res.json({ status: 'ok' });
});

router.post('/image', upload.single('missing'), function(req, res, next) {
  caption.path(req.file.path, {caption: 'HHOOLLAA', outputFile: './uploads/'+req.file.originalname}, function(err, image) {
    if (err) return err;
    bucket.upload('./uploads/'+req.file.originalname, function(err, file) {
      if (err) {
        return res.json({ error: err });
      }
      res.json({status: 'ok'});
    });
  })
});

module.exports = router;
