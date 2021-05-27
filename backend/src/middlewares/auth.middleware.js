const JWT = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

//Keys
const private_key = fs.readFileSync(path.join(__dirname, '..', 'keys', 'private.key'), 'utf8');
const public_key = fs.readFileSync(path.join(__dirname, '..', 'keys', 'public.key'), 'utf8');

//Roles
const roles = {
    low: ['ADMIN', 'USER'],
    high: ['ADMIN']
}


// =====================
// Verify Login - Lowest role
// =====================
const verifyLogin = (req, res, next) => {
    try {
        if (req.cookies == undefined) {
            throw ({ status: 401, err: "Resource inaccesible" });
        }
        JWT.verify(req.cookies.sessionId, public_key, {
                subject: req.cookies.user, //intended user of the token
                algorithm: ['RS256'], //signing algorithm
                expiresIn: process.env.CAD_TOKEN
            },
            function(err, decoded) {
                if (err || roles.low.indexOf(decoded.role) === -1) {
                    res.status(401).json(false);
                    //No valid token/role not correct so unauthorised
                } else {
                    if (req.method === "PUT" || req.method === "POST" || req.method === "DELETE") {
                        /*if (decoded.csrfToken.indexOf(req.headers['x-xsrf-token']) !== -1) {*/
                        req.user = decoded.user
                        req.userId = decoded.user._id
                        next();
                        /*} else {
                            res.status(403).json(false); //csrf token not valid
                        }*/
                    } else {
                        req.user = decoded.user
                        req.userId = decoded.user._id
                            //GET,HEAD or OPTIONS request
                        next();
                    }
                }
            })
    } catch (error) {
        console.log(error);
        const status = error.status ? error.status : 500
        res.status(status).json(error)
    }
};

// =====================
// Verify Admin Role - High role
// =====================
const verifyAdmin = (req, res, next) => {

    JWT.verify(req.cookies.sessionId, public_key, {
            subject: req.cookies.user, //intended user of the token
            algorithm: ['RS256'], //signing algorithm
            expiresIn: process.env.CAD_TOKEN
        },
        function(err, decoded) {
            if (err || roles.high.indexOf(decoded.role) === -1) {
                res.status(401).json(false);
                //No valid token/role not correct so unauthorised
            } else {
                if (req.method === "PUT" || req.method === "POST" || req.method === "DELETE") {
                    /*if (decoded.csrfToken.indexOf(req.headers['x-xsrf-token']) !== -1) {*/
                    req.user = decoded.user
                    req.userId = decoded.user._id
                    next();
                    /*} else {
                        res.status(403).json(false); //csrf token not valid
                    }*/
                } else {
                    req.user = decoded.user;
                    req.userId = decoded.user._id
                        //GET,HEAD or OPTIONS request
                    next();
                }
            }
        })
};


// =====================
// Verify Own - High/(same id) role
// =====================
const verifyOwn = (req, res, next) => {

    JWT.verify(req.cookies.sessionId, public_key, {
            subject: req.cookies.user, //intended user of the token
            algorithm: ['RS256'], //signing algorithm
            expiresIn: process.env.CAD_TOKEN
        },
        function(err, decoded) {
            if (err || !(roles.high.indexOf(decoded.role) === -1 || decoded.user._id !== req.params.id)) {
                res.status(401).json(false);
                //No valid token/role not correct so unauthorised
            } else {
                if (req.method === "PUT" || req.method === "POST" || req.method === "DELETE") {
                    /*if (decoded.csrfToken.indexOf(req.headers['x-xsrf-token']) !== -1) {*/
                    req.user = decoded.user
                    req.userId = decoded.user._id
                    next();
                    /*} else {
                        res.status(403).json(false); //csrf token not valid
                    }*/
                } else {
                    req.user = decoded.user;
                    req.userId = decoded.user._id
                        //GET,HEAD or OPTIONS request
                    next();
                }
            }
        })
};

// =====================
// Create Token's
// =====================
const createToken = (user, role, csrfToken) => {
    return JWT.sign({ user, role, csrfToken }, private_key, {
        subject: user._id.toString(), //intended user of the token
        algorithm: "RS256", //signing algorithm
        expiresIn: process.env.CAD_TOKEN
    })
};

//Module export
module.exports = { createToken, verifyAdmin, verifyLogin, verifyOwn }