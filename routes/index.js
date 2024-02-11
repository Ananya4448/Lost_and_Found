var express = require('express');
var router = express.Router();
const axios = require("axios");
var localStorage = require('localStorage')

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('home', {
    inserted : null,
  });
});

router.post('/', async function(req, res, next) {
  // console.log(req.body);
  var data = "";
  if(req.body.firstName)
  {
    try{
      var emailRegex = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(nitc)\.ac.in$/g;
      var passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      var valid = String(req.body.email)
      .toLowerCase()
      .match(emailRegex);
      var passValid = String(req.body.password).match(passwordRegex);
      // res.send({validation:valid});
      if(!valid)
      {
        console.log("Email validation working");
        res.render('home', {
            inserted : "Please put an nitc email",
          });
      }
      else if(req.body.password !== req.body.conPassword){
        console.log("same Pass validation working");
        res.render('home', {
            inserted : "Please put the same password carefully in confir password field",
          });
      }
      else if(!passValid)
      {
        console.log("Pass validation working");
        res.render('home', {
            inserted : "Please put a valid password carefully",
          });
      }
      else
      {
        console.log("data inserted");
        data = await axios.post(`http://localhost:5000/api/users`, req.body);
        console.log(data.data);
        res.render('home', {
          inserted : "User registered successfully, please log in",
        });
      }
    }
    catch(err)
    {
      console.log(err);
    }
    

  }
  else
  {
    try
    {
      const resp = await axios.post(`http://localhost:5000/api/users/login`, req.body);
      if(resp.data.success === 0)
      {
        res.render('home', {
          inserted : "Invalid email or password",
        });
      }
      else
      {  
        localStorage.setItem('token', JSON.stringify(resp.data.newToken));
        res.redirect('/dashboard/'+ resp.data.newToken.email);
      }
    }
    catch(err)
    {
      console.log(err);
    }
  }
});

module.exports = router;
