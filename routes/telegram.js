var express     = require('express');
var router      = express.Router();
var telegram    = require('../helpers/telegram.js');
var https       = require('https');
var config      = require('../config/config.js');
var querystring = require('qs');
var caption     = require('caption');
var multer      = require('multer');
var upload      = multer({ dest: './uploads/' });
var gcloud      = require('gcloud');
var mongoose    = require('mongoose');
var Pet         = require('../models/petSchema.js');


var gcs = gcloud.storage({
  projectId: 'missyapp-1242',
  keyFilename: './config/missyapp-c13275e43cdc.json'
});

var bucket = gcs.bucket('missyappbucket');

router.post('/', function(req, res, next) {
  console.log('[DEBUG] Entering route');
  var update  = req.body;
  var command = update.message.text;
  var chatId  = update.message.chat.id;
  var containsMultimedia = update.message.document ? true :  false;
  if (command === '/start') {
    console.log('[DEBUG] Entering if start');
    var model = {
      petName: '',
      petPic: '',
      userId: update.message.from.id,
      report: { coordinates: [], reported_at: '' }
    }
    Pet.create(model, function(err, post) {
      if (err) {
        console.error(err);
      }
      telegram.sendMessage(chatId, 'Hola, necesitamos una foto de tu mascota, en caso de que sea necesario podamos mandarla a las personas que esten en el area');
    });
  }
  else if (containsMultimedia) {
    console.log('[DEBUG] entering multimedia');
    telegram.getFile(update.message.document.file_id);
  }
});

module.exports = router;
