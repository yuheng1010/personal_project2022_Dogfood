const pool = require('../../db');

const getProducts = async()=>{
    const conn = await pool.getConnection();
    const [results] = await conn.query("SELECT * FROM allfoods2")
    return results
}

const getProductDetail = async(id) => {
    const [results] = await pool.query("SELECT * FROM allfoods2 WHERE id = ?",id)
    return results[0]
}

const selector = async(constraint) => {
    const element = constraint.split(' ');
    let query = "SELECT * FROM allfoods2 WHERE tags LIKE ? ";
    for(var i=0;i<element.length-1;i++){
        query += "AND tags LIKE ?"
    }   
    let temp=[]
    for(var i=0; i<element.length;i++){
        temp.push(`%${element[i]}%`)
    }
    const [results] = await pool.query(query,temp)
    return results;
}

const getProductComments = async (productId) => {
    const [result] = await pool.query('SELECT * FROM comments  WHERE pId=?',parseInt(productId));
    return result;
}
    module.exports = {
    getProducts,
    getProductDetail,
    selector,
    getProductComments
}