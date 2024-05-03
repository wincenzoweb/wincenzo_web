const express = require('express');
const CancellationController = require('../controllers/cancellationAndRefund.Controller');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/',authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']),CancellationController.addCancellation);
router.get('/',CancellationController.getAllCancellation);
router.get('/:id',CancellationController.getCancellationById);
router.put('/:id',authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']),CancellationController.updateCancellationById);
router.delete('/:id',authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']),CancellationController.removeCancellationById);

module.exports = router;