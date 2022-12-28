require('dotenv').config();
const crypto = require('crypto');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const User = require('../server/models/user_model');
const JWT = process.env.JWT; // 30 days by seconds
const jwt = require('jsonwebtoken');
const { promisify } = require('util'); // util from native nodejs library


const wrapAsync = (fn) => {
    return function(req, res, next) {
        // Make sure to `.catch()` any errors and pass them along to the `next()`
        // middleware in the chain, in this case the error handler.
        fn(req, res, next).catch(next);
    };
};

const authentication = () => {
    return async function (req, res, next) {
        let accessToken = req.get('Authorization')
        console.log(accessToken)
        if (!accessToken) {
            res.status(401).send({error: 'Unauthorized'});
            return;
        }

        accessToken = accessToken.replace('Bearer ', '');
        if (accessToken == 'null') {
            res.status(401).send({error: 'Unauthorized'});
            return;
        }

        try {
            const user = await promisify(jwt.verify)(accessToken, JWT);
            req.user = user;
           
                let userDetail;
                console.log("thisuemail"+user.email)
                userDetail = await User.getUserDetail(user.email);
                
                if (!userDetail) {
                    res.status(403).send({error: 'Forbidden'});
                } else {
                    req.user.id = userDetail.id;
                    req.user.userName = userDetail.userName;
                    req.user.phone = userDetail.phone;
                    req.user.dogName = userDetail.dogName;
                    req.user.dogVar = userDetail.dogVar;
                    req.user.dogAge = userDetail.dogAge;
                    next();
                }
            
            return;
        } catch(err) {
            console.log(err);
            res.status(403).send({error: 'Forbidden'});
            return;
        }
    };
};

module.exports = {
    wrapAsync,
    authentication
};
