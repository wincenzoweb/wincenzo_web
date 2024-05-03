// routes/orderAssignmentRoutes.js
const express = require("express");
const router = express.Router();
const orderAssignmentController = require("../controllers/orderAssignmentController");
const authMiddleware = require("../middleware/authMiddleware");

// Create a new assignment
router.post(
  "/",
  authMiddleware.authenticateUser,
  authMiddleware.checkUserRole(["admin"]),
  orderAssignmentController.assignOrder
);

// Retrieve assignments by delivery boy ID
router.get(
  "/deliveryboy/:deliveryBoyId",
  authMiddleware.authenticateUser,
  authMiddleware.checkUserRole(["admin", "deliveryboy"]),
  orderAssignmentController.getAssignmentsByDeliveryBoyId
);
// Update assignment status
router.put(
  "/:id",
  authMiddleware.authenticateUser,
  authMiddleware.checkUserRole(["admin", "deliveryboy"]),
  orderAssignmentController.updateAssignmentStatus
);

// Delete assignment
router.delete(
  "/:id",
  authMiddleware.authenticateUser,
  authMiddleware.checkUserRole(["admin"]),
  orderAssignmentController.deleteAssignment
);

//  Get all orders assigned to the delivery boy
router.get(
  "/assigned/:orderId",
  authMiddleware.authenticateUser,
  authMiddleware.checkUserRole(["admin", "deliveryboy"]),
  orderAssignmentController.getOrdersAssignedToDeliveryBoy
);

// Get all orders assigned
router.get(
  "/",
  authMiddleware.authenticateUser,
  authMiddleware.checkUserRole(["admin"]),
  orderAssignmentController.getAllAssignments
);

router.get(
  "/:id",
  authMiddleware.authenticateUser,
  authMiddleware.checkUserRole(["admin", "deliveryboy"]),
  orderAssignmentController.getuserDetails
);

module.exports = router;
