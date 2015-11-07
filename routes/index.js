var express = require('express');
var ServerLibrary=require('../libraries/ServerLibrary.js');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var sl=new ServerLibrary();

  res.render('index', sl.GetStatus());
});

module.exports = router;
