var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  console.log(req);
  res.json({ status: 'ok' });
});

module.exports = router;
