const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin','user']), settingsController.getSettings);

router.post('/razorpay', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), settingsController.createRazorpaySettings); 
router.put('/razorpay', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), settingsController.updateRazorpaySettings);

router.post('/twilio', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), settingsController.createTwilioSettings);
router.put('/twilio', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), settingsController.updateTwilioSettings);

router.post('/google-analytics', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), settingsController.createGoogleAnalyticsSettings);
router.put('/google-analytics', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), settingsController.updateGoogleAnalyticsSettings);

router.post('/mongodb', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), settingsController.createMongoDBSettings);
router.put('/mongodb', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), settingsController.updateMongoDBSettings);

module.exports = router;
