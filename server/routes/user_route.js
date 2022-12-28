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
    addComment,
    getPersonCollection,
    addCollection,
    deleteCollection,
    ifProductCollection
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

router.route('/getPersonCollection')
    .post(authentication(), wrapAsync(getPersonCollection));

router.route('/addCollection')
    .post(authentication(), wrapAsync(addCollection));

router.route('/deleteCollection')
    .post(authentication(), wrapAsync(deleteCollection));

router.route('/ifProductCollection')
    .post(authentication(), wrapAsync(ifProductCollection));


module.exports = router;