var express = require('express');
var router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get('/:email', async function(req, res, next) {
    var email = req.params.email;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '/' + mm + '/' + dd;
    try
    {
        const result = await axios.get('http://localhost:5000/api/users/search/' + email);
        const allReports = await axios.get('http://localhost:5000/api/reports/getAllReports');
        const allUsers = await axios.get('http://localhost:5000/api/users/');
        const perDayData = await axios.post('http://localhost:5000/api/reports/getPerDayReports', {date:today});
        console.log(allUsers);
        res.render('dashboard', {
            userData : result.data.message[0], 
            reports : allReports.data.message,
            allUsers : allUsers.data.message,
            perDayData: perDayData.data.message,
            searchBy:"",
            slug:"dashboard",
        });
    }
    catch(err)
    {
        console.log(err);
    }
});


router.post('/:email', async function(req, res, next) {
    var body = req.body;
    var email = req.params.email;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '/' + mm + '/' + dd;
    console.log(body);
    try{
        const reportResult = await axios.post('http://localhost:5000/api/reports/searchByReports', body);
        const result = await axios.get('http://localhost:5000/api/users/search/' + email);
        const allUsers = await axios.get('http://localhost:5000/api/users/');
        const perDayData = await axios.post('http://localhost:5000/api/reports/getPerDayReports', {date:today});
        console.log(reportResult.data);
        res.render('dashboard', {
            userData : result.data.message[0], 
            reports : reportResult.data.message,
            allUsers : allUsers.data.message,
            perDayData: perDayData.data.message,
            searchBy: req.body.searchBy,
            slug:"dashboard",
        });
    }catch(err){
        console.log(err);
    }
});


module.exports = router;
