'use strict';
var cartController = require('../../controllers/cart.controller.js');
var express = require('express');
var router = express.Router();

/* Get The Cart */
router.get('/', cartController.getCart);

/* Add to Cart */
router.post('/', cartController.addToCart);

/* Remove From Cart */
router.delete('/:cartItemId', cartController.removeFromCart);

module.exports = router;