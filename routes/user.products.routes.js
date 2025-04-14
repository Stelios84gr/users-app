const express = require('express');
const router = express.Router();

const userProductsController = require('../controllers/user.product.controller');

router.get('/', userProductsController.findAll);
router.get('/:username', userProductsController.findOne);
router.post('',userProductsController.create);
router.patch('/:username', userProductsController.update);
router.delete('/:username/products/:id', userProductsController.delete);
router.get('/stats/stats1', userProductsController.stats1);

module.exports = router;