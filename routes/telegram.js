var express = require('express');
var router = express.Router();
var telegram = require('../helpers/telegram.js');

var caption = require('caption');
var multer = require('multer');
var upload = multer({ dest: './uploads/' });

var gcloud = require('gcloud');

var mongoose = require('mongoose');
var Pet = require('../models/petSchema.js');


var gcs = gcloud.storage({
  projectId: 'missyapp-1242',
  keyFilename: './config/missyapp-c13275e43cdc.json'
});

var bucket = gcs.bucket('missyappbucket');

router.post('/', function(req, res, next) {
  var update = req.body;
  var telegramCmd = update.message.text;
  console.log(telegramCmd);
  var model = {
    petName: '',
    petPic: '',
    userId: update.message.from.id,
    report: { coordinates: [], reported_at: '' }
  }
  var chat_id = update.message.chat.id;
  var reply_to_message_id = update.message.message_id;
  if (telegramCmd === '/hola') {
    Pet.create(model, function(err, post) {
      telegram.sendMessage(chat_id, 'hola');
    })
  }
  res.json({ status: 'ok' });
});

router.post('/image', upload.single('missing'), function(req, res, next) {
  caption.path(req.file.path, {caption: 'HHOOLLAA', outputFile: './uploads/'+req.file.originalname}, function(err, image) {
    if (err) {
      console.log("error en caption", err)
    };
    bucket.upload('./uploads/'+req.file.originalname, function(err, file) {
      if (err) {
        console.log('error en bucket upload');
        return res.json({ error: err });
      }
      res.json({status: 'ok'});
    });
  })
});

module.exports = router;
