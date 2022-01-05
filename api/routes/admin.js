const router = require('express').Router();
const adminController = require('../controllers/adminController');
const purchasesController = require('../controllers/purchasesController');

//-------------------GET ROUTES FOR PURCHASES-------------------

router.get('/purchases',purchasesController.getPurchases);

router.get('/purchases/:id',purchasesController.getPurchasesByUserId);

//-------------------POST ROUTES-------------------

router.post('/products' , adminController.createProduct);

router.post('/users' , adminController.createUser);

//-------------------PUT ROUTES-------------------

router.put('/products/:id' , adminController.updateProduct);

router.put('/users/:id' , adminController.updateUserByIdParams);

//-------------------DELETE ROUTES-------------------

router.delete('/products/:id' , adminController.deleteProduct);

router.delete('/users/:id' , adminController.deleteUserByIdParams);



module.exports = router;