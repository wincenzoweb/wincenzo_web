const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const wishlistController = require('../controllers/wishlistController');

// Create a new wishlist item
router.post('/',authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin','user']), wishlistController.createWishlistItem);

// Get all wishlist items for a user
router.get('/:userId', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin','user']),wishlistController.getWishlistItemsByUser);

// Remove a wishlist item
router.delete('/:id',authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin','user']), wishlistController.removeWishlistItem);

module.exports = router;