var express = require('express');
var router = express.Router();
const axios = require("axios");

router.get('/:id', async (req, res) => {
    var id = req.params.id;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '/' + mm + '/' + dd;
    try
    {
        const deleteData = await axios.delete('http://localhost:5000/api/reports/deleteReport/' + id);
        res.redirect('/admin-reports');
    }
    catch(err)
    {
        console.log(err);
    }
});

module.exports = router;