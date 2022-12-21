const router = require('express').Router();

const {
    getProducts,
    getProductDetail,
    selector,
    getProductComments
} = require('../controllers/product_controller');

router.route('/allfoods')
    .get(getProducts);

router.route('/detail')
    .get(getProductDetail);

router.route('/selector')
    .get(selector)

router.route('/productComment')
    .get(getProductComments)

module.exports = router;