const express = require('express');
const router = express.Router();
const request = require("request");

const options = {
    method: 'POST',
    url: process.env.AUTH0_API_URL_TOKEN,
    headers: { 'content-type': 'application/json' },
    body: process.env.AUTH0_API_BODY_TOKEN 
};

/* GET home page. */
router.get('/', function (req, res, next) {
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.json(response);
        console.log(body);
    });
});

module.exports = router;