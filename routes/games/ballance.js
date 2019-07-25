var express = require('express');
var router = express.Router();

/* GET snake page. */
router.get('/', function(req, res, next) {
    res.render('games/ballance');
});

module.exports = router;