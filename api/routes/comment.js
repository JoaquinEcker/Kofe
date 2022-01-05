const router = require('express').Router();
const {addComment, getComments, deleteComment} = require('../controllers/commentController');

router.get('/:id', getComments); // get all comments for a product

router.post('/:id', addComment); // add a comment to a product, send a body with the comment 

router.delete('/:id', deleteComment); // delete a comment from a product with the COMMENT ID

module.exports = router;