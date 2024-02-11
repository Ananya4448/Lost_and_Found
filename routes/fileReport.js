var express = require('express');
var router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get('/:id', async function(req, res, next) {
    var id = req.params.id;
    try
    {
        const result = await axios.get('http://localhost:5000/api/users/'+id);
        res.render('addFileReport', {
            userData: result.data.message,
            dataUpdated: false,
        });
    }
    catch(err)
    {
        console.log(err);
    }
});

router.post('/:id', async (req, res, next) => {
    var id = req.params.id;
    var body = req.body;
    body.id = parseInt(id);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '/' + mm + '/' + dd;
    
    body.createdAt = today;
    body.updatedAt = today;
    body.isFound = 0;
    var payload = body;
    try
    {
        console.log(payload);
        const response = await axios.post('http://localhost:5000/api/reports', payload);
        console.log(response.data);
        const result = await axios.get('http://localhost:5000/api/users/'+id);
        res.render('addFileReport', {
            userData: result.data.message,
            dataUpdated: response.data,
        });
    }
    catch(err)
    {
        console.log(err);
    }
});


module.exports = router;
