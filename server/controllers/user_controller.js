require('dotenv').config();
const User = require('../models/user_model');
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
    let {userName,phone,email,password,dogName,dogVar,dogAge} = req.body;
    if(!userName || !email || !password) {
        res.status(400).send({msg:'Request Error: name, email and password are required.'});
        return;
    }
    const result = await User.signUp(userName,phone,email,password,dogName,dogVar,dogAge);
    if(result === 1) {
        return res.status(400).send({msg:"Failed! Username is already in use!"});
    }else{
         res.status(200).send({msg:"sinup success!"});
    }
   
};
const signIn = async (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    console.log(email)
    console.log(password)
    res.send(await User.signIn(email,password)) 
}

const authJWT = async (req, res) =>{
    try {
        const token = req.header('Authorization').replace('Bearer', ' ');
        const decoded = jwt.verify(token, process.env.JWT);
        req.id = decoded.id;
        console.log(decoded.id);
        console.log(decoded);
        res.send({message:decoded});
    } catch (err) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
}

const getUserDetail = async(req, res) => {
    const user = await User.getUserDetail(req.user.email)
    res.status(200).send(user)
}

const addComment = async(req,res) =>{
    let {grade,content,pId} = req.body;
    const email = req.user.email;
    const dogVar = req.user.dogVar;
  
    return await User.addComment(req.user.id,email,grade,content,pId,dogVar);
}

const getPersonCollection = async (req, res) => {
    if(req.user.id !== undefined) {
        const collections = await User.getPersonCollection(req.user.id);
        res.status(200).send(collections);
    }else {
        res.status(400).send({error:'Wrong Request'});
    }
}

const addCollection = async (req, res) => {
    if(req.user.id && req.body.pId) {
        const collections = await User.addCollection(req.user.id, req.body.pId);
        res.status(200).json(collections);
    }else {
        res.status(400).send({error:'Wrong Request'});
    }
}

const deleteCollection = async (req, res) => {
    if(req.user.id && req.body.pId) {
        const collections = await User.deleteCollection(req.user.id, req.body.pId);
        res.status(200).json(collections);
    }else {
        res.status(400).send({error:'Wrong Request'});
    }
}

module.exports = {
    signUp,
    signIn,
    authJWT,
    getUserDetail,
    addComment,
    getPersonCollection,
    addCollection,
    deleteCollection
};