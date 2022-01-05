const router = require('express').Router();
const {getAll,getById,getByPriceAndTag,getByDescription,getByTitleAndTag,getByTag,getByTitle,createProduct,updateProduct,deleteProduct, getRatings, addRating, removeRating, getRatingAverage, getByTitleAndDescription} = require('../controllers/productController');


//-------------------GET ALL PRODUCTS-------------------

router.get('/',getAll);

//-------------------GET PRODUCT BY ID-------------------

router.get('/:id',getById);

//-------------------GET PRODUCT BY PRICE AND TAG-------------------

router.get('/priceMax/:max/priceMin/:min/tag/:tag',getByPriceAndTag); //ruta larga, sino no se puede pasar el parametro max y min por separado

//-------------------GET PRODUCT BY TAG-------------------

router.get('/tag/:tag',getByTag);

//-------------------GET PRODUCT BY TITLE-------------------

router.get('/title/:title',getByTitle);

//-------------------GET BY TITLE AND TAG-------------------

router.get('/titleAndTag/:title/tag/:tag', getByTitleAndTag) 

//-------------------GET BY DESCRIPTION-------------------

router.get('/description/:description',getByDescription);
//-------------------GET BY TITLE AND DESCRIPTION-------------------

router.get('/search/:search', getByTitleAndDescription)

//-------------------GET RATINGS-------------------

router.get('/:id/ratings',getRatings);

//-------------------AVERAGE RATING-------------------

router.get('/:id/average', getRatingAverage);

//-------------------ADD RATING-------------------

router.put('/:id/ratings' ,addRating);

//-------------------REMOVE RATING-------------------

router.delete('/:id/ratings/', removeRating);


module.exports = router;