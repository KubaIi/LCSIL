var express = require('express');
var router = express.Router();
var bricklinkService = require('../services/bricklink')

router.get('/getItemInfo', function (req, res, next) {
  var input = req.query.serialNumber;
  bricklinkService.getItemInfo(input).then(function(data){
    res.json(data);
  });
});

module.exports = router;