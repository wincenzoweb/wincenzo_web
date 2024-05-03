const express = require('express');
const ConditionController = require('../controllers/TermAndCondition.Controller');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), ConditionController.addCondition);
router.get('/', ConditionController.getAllCondition);
router.get('/:id', ConditionController.getConditionsById);
router.put('/:id', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), ConditionController.updateConditionsById);
router.delete('/:id', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), ConditionController.removeConditionsById);

module.exports = router;