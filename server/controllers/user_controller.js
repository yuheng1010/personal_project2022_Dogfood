require('dotenv').config();
const User = require('../models/user_model');
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
    let {userName,phone,email,password,dogName,dogVar,dogAge} = req.body;
    if(!userName || !email || !password) {
        res.status(400).send({error:'Request Error: name, email and password are required.'});
        return;
    }
    const result = await User.signUp(userName,phone,email,password,dogName,dogVar,dogAge);
    if(result === 1) {
        return res.status(400).send({message:"Failed! Username is already in use!"});
    }else{
         res.status(200).send({msg:"sinup success!"});
    }
   
};
const signIn = async (req, res)=>{
    const{email,password} = req.body;
    res.send(await User.signIn(email,password)) 
}

const authJWT = async (req, res) =>{
    try {
        const token = req.header('Authorization').replace('Bearer', ' ');
        const decoded = jwt.verify(token, process.env.secretJWT);
        req.id = decoded.id;
        console.log(decoded.id);
        console.log(decoded);
        res.send({message:decoded});
    } catch (err) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
}
module.exports = {
    signUp,
    signIn,
    authJWT
};