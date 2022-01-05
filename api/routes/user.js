const router = require('express').Router();

const { updateUserByIdParams } = require('../controllers/adminController');
const {getAll, getById, deleteUserByIdParams} = require('../controllers/userController');


router.get('/', getAll);

router.get('/:id', getById);

router.put('/:id', updateUserByIdParams);

router.delete('/:id', deleteUserByIdParams);


module.exports = router;