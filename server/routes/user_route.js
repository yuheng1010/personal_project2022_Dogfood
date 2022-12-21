const router = require('express').Router();
const {
    wrapAsync,
    authentication
} = require('../../util/util');
const {
    signUp,
    signIn,
    authJWT,
    getUserDetail,
    addComment
} = require('../controllers/user_controller');

router.route('/signUp')
    .post(signUp);

router.route('/signIn')
    .post(signIn);

router.route('/authJWT')
    .get(authJWT);

router.route('/userDetail')
    .post(authentication(), wrapAsync(getUserDetail));

router.route('/addComment')
    .post(authentication(), wrapAsync(addComment));

module.exports = router;