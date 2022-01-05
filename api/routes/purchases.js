const router = require('express').Router();
const PurchasesController = require('../controllers/purchasesController');

//this route is for getting all purchases from the current user

//the rest of the routes are for getting purchases by userId, or EVERY purchase in the database, so they are admin only

router.get('/', PurchasesController.getCurrentUserPurchases);




module.exports = router;
