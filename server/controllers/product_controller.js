const Product = require('../models/product_model');

const getProducts = async (req, res) => {
    const results = await Product.getProducts();
    if (!results) {
        res.status(400).send({error:'Wrong'});
        return;
    }
    res.status(200).json(results);
}
const getProductDetail = async (req,res) => {
    const id = req.query.id;
    const results = await Product.getProductDetail(id);
    if (!results) {
        res.status(400).send({error:'Wrong'});
        return;
    }
    res.status(200).json(results);
}

const selector = async (req,res) => {
    const con = req.query.con;
    const results = Product.selector(con)
}

module.exports = {
    getProducts,
    getProductDetail,
    selector
}