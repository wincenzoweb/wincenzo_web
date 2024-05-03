const express = require('express');
const PolicyController = require('../controllers/privacyPolicy.Controller');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/',authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']),PolicyController.addPolicy);
router.get('/',PolicyController.getAllPolicy);
router.get('/:id',PolicyController.getPolicyById);
router.put('/:id',authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']),PolicyController.updatePolicyById);
router.delete('/:id',authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']),PolicyController.removePolicyById);

module.exports = router;