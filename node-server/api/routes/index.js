var express = require('express');
var router = express.Router();
const secured = require('../lib/middleware/secured');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({ title: 'Index of the Web App' });
});

module.exports = router;