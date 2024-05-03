// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// POST /api/users - Create a new user (available to all)
router.post("/", userController.createUser);

// POST /api/users/login - Login user
router.post("/login", userController.loginUser);

// POST /api/users/admin - Create admin account (only for admin)
router.post(
  "/admin",
  authMiddleware.authenticateUser,
  authMiddleware.checkUserRole(["admin"]),
  userController.createAdmin
);
router.post(
  "/admin/init",
  userController.createInitialAdmin
);

// POST /api/users/deliveryboy - Create delivery boy account (only for admin)
router.post(
  "/deliveryboy",
  authMiddleware.authenticateUser,
  authMiddleware.checkUserRole(["admin"]),
  userController.createDeliveryBoy
);

// GET /api/users - Get all users (only for admin)
router.get(
  "/alluser",
  authMiddleware.authenticateUser,
  authMiddleware.checkUserRole(["admin"]),
  userController.getAllUsers
);
router.get(   
  "/alldeliveryboy",
  authMiddleware.authenticateUser,
  authMiddleware.checkUserRole(["admin"]),
  userController.getAlldeliveryboy
);

// GET /api/users/:id - Get user by ID (available to all)
router.get("/:id", userController.getUserById);

// PUT /api/users/:id - Update user by ID (available to all)
router.put("/:id", userController.updateUserById);

// DELETE /api/users/:id - Delete user by ID (only for admin)
router.delete(
  "/:id",
  authMiddleware.authenticateUser,
  // authMiddleware.checkUserRole(["admin"]),
  userController.deleteUserById
);

// POST /api/users/ - forgot user Password with otp genreter by ID (only for admin)
router.post(
  "/forgotpassword",
  // authMiddleware.authenticateUser,
  // authMiddleware.checkUserRole(["admin"]),
  userController.resetPassword
);

// POST /api/users/ - forgot user Password with otp verify by ID (only for admin)
router.post(
  "/forgotpassword/verify",
  // authMiddleware.authenticateUser,
  // authMiddleware.checkUserRole(["admin"]),
  userController.resetPasswordOtpVerify
);

// Twilio routes (available to all)
router.post("/start-verification", userController.startVerification);
router.post("/check-verification", userController.checkVerification);

module.exports = router;
