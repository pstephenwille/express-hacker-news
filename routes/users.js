var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get(`/user`, function(req, res, next) {
  console.log('%c...res', 'color:gold', req.query)
  res.json({foo:'woot'});
});

module.exports = router;
