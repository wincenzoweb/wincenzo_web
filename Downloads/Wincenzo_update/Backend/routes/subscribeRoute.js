const express = require('express');
const subscriberController = require('../controllers/subscribeController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', subscriberController.addSubscriber);
router.get('/', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), subscriberController.getSubscriber);
router.delete('/:id', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), subscriberController.removeSubscriberById);

module.exports = router;
