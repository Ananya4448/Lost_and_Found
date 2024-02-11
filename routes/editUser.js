var express = require('express');
var router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get('/:id', async function(req, res, next) {
    var id = req.params.id;
    try
    {
        const result = await axios.get('http://localhost:5000/api/users/'+id);
        res.render('editUser', {
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
    try
    {
        console.log(req.body.firstName);
        var payload = {
            id:id,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
        }
        const response = await axios.put('http://localhost:5000/api/users/', payload);
        console.log(response.data);
        const result = await axios.get('http://localhost:5000/api/users/'+id);
        res.render('editUser', {
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
