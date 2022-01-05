const router = require('express').Router();
const {getCart,deleteCart,addToCart, checkout, deleteIndividualProduct} = require('../controllers/cartControllers');

router.get('/',getCart); // este metodo es para obtener el carrito en base al id del usuario actual

router.delete('/:id',deleteCart);//este metodo borra el carrito de la base de datos

router.delete('/individual/:id',deleteIndividualProduct)

router.post('/checkout', checkout); 

router.post('/:id',addToCart); //este metodo recibe por parametro el id del producto, y en el body se envia la cantidad que se quiere agregar al carrito, primero busca el carrito, si no existe lo crea, si existe agrega al carrito la cantidad indicada en el body (o resta si es negativo)


module.exports = router;