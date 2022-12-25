const pool = require('../../db');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


const signUp = async(userName,phone,email,password,dogName,dogVar,dogAge)=>{
    password = bcrypt.hashSync(password, 10);
    const conn = await pool.getConnection();
    const [exist] = await conn.query("SELECT EXISTS (SELECT id FROM user WHERE email = ?)AS Output",email)
    console.log(exist[0].Output)
    if(exist[0].Output === 0){
        await conn.query("INSERT INTO user(userName,phone,email,password,dogName,dogVar,dogAge) VALUES (?,?,?,?,?,?,?)",[userName,phone,email,password,dogName,dogVar,dogAge])
        return exist[0].Output;
    }else{
        return exist[0].Output;
    }
}

const signIn = async(email,password) =>{
    const [exist] = await pool.query("SELECT EXISTS (SELECT id FROM user WHERE email = ?)AS Output",email)
    if(exist[0].Output === 0){
        return {message:"Failed! User account is not correct!"};
    }else{
        const [res] = await pool.query("SELECT * FROM user WHERE email = ?",email)
        console.log(res[0].password)
        if(res[0].password){
            realPSW = bcrypt.compareSync(password, res[0].password);
            if (!realPSW) {
                return ({message:"WRONG_PASSWORD"});
            }
            const payload = {
                id: res[0].id,
                userName: res[0].userName,
                phone:res[0].phone,
                email:res[0].email,
                dogName:res[0].dogName,
                dogVar:res[0].dogVar,
                dogAge:res[0].dogAge,
            };
            const token = jwt.sign(payload, process.env.JWT, { expiresIn: 86400 });
            return ({ message: "LOGIN_SUCCESSFULLY", token });
        }
    }
}
const getUserDetail = async (email) => {
    try {
        const [users] = await pool.query('SELECT * FROM user WHERE email = ?', email);
        return users[0];
    } catch (e) {
        return null;
    }
};

const addComment = async (userId,email,grade,content,pId,dogVar) => {
    try{
        await pool.query('INSERT INTO comments(userId,userEmail,grade,`text`,pId,dogVar) VALUES (?,?,?,?,?,?)',[userId,email,parseInt(grade),content,parseInt(pId),dogVar]);
    }catch(e){
        console.log(e)
    }
}

const getPersonCollection = async (userId) => {
    const [result] = await pool.query('SELECT * FROM collection AS a, allfoods2 AS b WHERE a.pId = b.id AND userId = ?', userId);
    return result;
}

const addCollection = async (userId, pId) => {
    const [result] = await pool.query( 'INSERT INTO collection(userId, pId) VALUES (?, ?)', [userId,pId]);
    return result;
}

const deleteCollection = async (userId, pId) => {
    const [result] = await pool.query('DELETE FROM collection WHERE userId = ? AND pId = ?', [userId,pId]);
    return result;
}

const ifProductCollection = async (userId, pId) => {
    const [result] = await pool.query("SELECT EXISTS (SELECT id FROM collection WHERE userId = ? AND pId = ? )AS Output", [userId, pId])
    return result[0].Output
}



module.exports = {
    signUp,
    signIn,
    getUserDetail,
    addComment,
    getPersonCollection,
    addCollection,
    deleteCollection,
    ifProductCollection,
};