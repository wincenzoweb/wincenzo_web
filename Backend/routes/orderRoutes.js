// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new order
router.post('/', authMiddleware.authenticateUser,  orderController.createOrder);



router.get('/',  authMiddleware.authenticateUser, orderController.getAllOrders);

// Retrieve order by ID
router.get('/:id', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), orderController.getOrderById);


router.get(
  "/user/:id",
  authMiddleware.authenticateUser,
  orderController.getUserOrders
);

// Update order by ID
router.put('/:id', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), orderController.updateOrderById);

// Delete order by ID
router.delete('/:id', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), orderController.deleteOrderById);

router.post(
  "/payment",
  authMiddleware.authenticateUser,
  authMiddleware.checkUserRole(["admin"]),
  orderController.paymentStatus
);

module.exports = router;
