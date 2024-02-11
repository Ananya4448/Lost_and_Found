var express = require('express');
var router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get('/:id', async function(req, res, next) {
    var id = req.params.id;
    try
    {
        const result = await axios.get('http://localhost:5000/api/users/'+id);
        res.render('changePassword', {
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
        console.log(req.body.password);
        var passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        var passValid = String(req.body.password).match(passwordRegex);
        if(!passValid)
        {
            console.log("Pass validation working");
            const result = await axios.get('http://localhost:5000/api/users/'+id);
            res.render('changePassword', {
                userData: result.data.message,
                dataUpdated: "Please put a valid password"
            });
        }
        else if(req.body.password !== req.body.confirmPassword)
        {
            const result = await axios.get('http://localhost:5000/api/users/'+id);
            res.render('changePassword', {
                userData: result.data.message,
                dataUpdated: "different pass",
            })
        }
        else
        {
            var payload = {
                id:id,
                password:req.body.password,
            }
            const response = await axios.put('http://localhost:5000/api/users/changePassword/'+id, payload);
            console.log(response.data);
            const result = await axios.get('http://localhost:5000/api/users/'+id);
            res.render('changePassword', {
                userData: result.data.message,
                dataUpdated: response.data,
            });
        }
    }
    catch(err)
    {
        console.log(err);
    }
});


module.exports = router;
