const express = require('express');
const inquiryController = require('../controllers/inquiry.controllers');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', inquiryController.addInquiry);
router.get('/', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), inquiryController.getAllInquiry);
router.get('/:id', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), inquiryController.getInquiryById);
router.put('/:id', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), inquiryController.updateInquiryById);
router.delete('/:id', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), inquiryController.removeInquiryById);

module.exports = router;