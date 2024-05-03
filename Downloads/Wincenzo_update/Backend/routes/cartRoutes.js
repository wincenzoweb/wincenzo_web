const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const cartController = require('../controllers/cartController');

// Add product to user's cart
router.post('/',authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin','user']),cartController.addToCart);

// View user's cart
router.get('/:userId',authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin','user']),cartController.viewCart);

// Update cart item
router.put('/:id',authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin','user']),cartController.updateCartItem);

// Remove product from cart
router.delete('/:id',authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin','user']),cartController.removeSingleCartItem);
router.post('/removecartitem',authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin','user']),cartController.removeCartItem);

module.exports = router;
