const express = require("express");
const router = express.Router();
const couponController = require("../controllers/couponController");
const authMiddleware = require('../middleware/authMiddleware');

router.post("/", authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), couponController.createCoupon);

router.get("/", authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), couponController.getAllCoupons);

router.get("/:id", couponController.getCouponById);

router.put("/:id", authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), couponController.updateCouponById);

router.delete("/:id", authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), couponController.deleteCouponById);

module.exports = router;
