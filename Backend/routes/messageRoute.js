const express = require('express');
const messageController = require('../controllers/messageController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', messageController.addMessage);
router.get('/', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), messageController.getAllMessage);
router.delete('/:id', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), messageController.removeMessageById);

module.exports = router;
