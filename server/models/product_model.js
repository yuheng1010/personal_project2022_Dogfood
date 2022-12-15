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

const selector = async(con) => {
    const element = con.split('-');
}
module.exports = {
    getProducts,
    getProductDetail,
    selector
}