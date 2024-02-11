var express = require('express');
var router = express.Router();
const axios = require("axios");

router.get('/', async function(req, res, next) {
    res.render('contactUs', {
      inserted : null,
    });
  });

router.post('/', async (req, res, next) => {
    var body = req.body;
    console.log(body);
    try
    {
        const data = await axios.post('http://localhost:5000/api/contactUs', body);
        res.redirect('/');
    }catch(err){
        console.log(err);
    }
});

module.exports = router;