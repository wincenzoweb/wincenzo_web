const express = require('express');
const ShippingAndDeliveryController = require('../controllers/shippingAndDelivery.Controller');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), ShippingAndDeliveryController.addCondition);
router.get('/', ShippingAndDeliveryController.getAllCondition);
router.get('/:id', ShippingAndDeliveryController.getConditionsById);
router.put('/:id', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), ShippingAndDeliveryController.updateConditionsById);
router.delete('/:id', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), ShippingAndDeliveryController.removeConditionsById);

module.exports = router;