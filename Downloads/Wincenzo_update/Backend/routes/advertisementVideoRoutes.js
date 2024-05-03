const express = require('express');
const router = express.Router();
const advertisementVideoController = require('../controllers/advertisementVideoController'); // Updated import statement
const authMiddleware = require('../middleware/authMiddleware');

// Route to add a new advertisement video 
router.post('/', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), advertisementVideoController.addAdvertisementVideo); // Updated controller function

// Route to update an existing advertisement video 
router.put('/:id', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), advertisementVideoController.updateAdvertisementVideo); // Updated controller function

// Route to get all advertisement videos 
router.get('/', advertisementVideoController.getAllAdvertisementVideos); // Updated controller function

// Route to delete an advertisement video 
router.delete('/:id', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), advertisementVideoController.deleteAdvertisementVideo); // Updated controller function

module.exports = router;
