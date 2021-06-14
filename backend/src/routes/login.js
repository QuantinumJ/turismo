const express = require('express');
const route = express.Router()
const login = require('../controllers/loginController')
const csurf = require('csurf');



function customValue(req) {
    return req.headers['x-xsrf-token'];
}
const csrfProtection = csurf({ cookie: true, value: customValue });


//Pages/subpages methods

// route.get("/", login.getIsLoggedIn);

route.post("/", login.loginUser);

route.post("/logout", login.logOutUser);


route.get("/", csrfProtection, function(req, res) {
    const token = req.csrfToken();
    res.cookie("XSRF-TOKEN", token, { httpOnly: false, secure: false });
    res.status(200).send();
});


//Router export
module.exports = route;