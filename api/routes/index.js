const user = require('./user');
const product = require('./product');
const router = require('express').Router();
const {checkAuth, checkAdmin} = require('../middlewares/auth');
const auth = require('./auth');
const cart = require('./cart');
const comment = require('./comment');
const admin = require('./admin');
const purchases = require('./purchases');


router.use('/admin',checkAdmin, admin);
router.use('/auth', auth);
router.use('/user', checkAuth, user);
router.use('/product', product);
router.use('/cart', cart);
router.use('/purchases', purchases);
router.use('/comment', comment); 


module.exports = router;

