const router = require('express').Router();
const {
    signUp,
    signIn,
    authJWT
} = require('../controllers/user_controller');

router.route('/signUp')
    .post(signUp);
router.route('/signIn')
    .post(signIn);
router.route('/authJWT')
    .get(authJWT);
module.exports = router;