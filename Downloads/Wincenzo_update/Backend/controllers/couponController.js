const Coupon = require("../models/coupon");

const createCoupon = async (req, res) => {
    try {
      const couponData = req.body;
      const coupon = new Coupon(couponData);
      await coupon.save();
      res.status(201).json({ message: "Coupon created successfully", coupon });
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.code === 1) {
        return res.status(400).json({ message: "Coupon code already exists" });
      }
      res.status(400).json({ message: error.message });
    }
  };

  const getAllCoupons = async (req, res) => {
    try {
      const coupons = await Coupon.find();
      const couponCount = coupons.length; 
      res.json({ totalCoupons: couponCount, coupons });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  

const getCouponById = async (req, res) => {
  try {
    const couponId = req.params.id;
    const coupon = await Coupon.findById(couponId);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    res.json(coupon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCouponById = async (req, res) => {
    try {
      const couponId = req.params.id;
      const updateData = req.body;
      const coupon = await Coupon.findByIdAndUpdate(couponId, updateData, {
        new: true,
      });
      if (!coupon) {
        return res.status(404).json({ message: "Coupon not found" });
      }
      res.json({ message: "Coupon updated successfully", coupon });
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.code === 1) {
        return res.status(400).json({ message: "Coupon code already exists" });
      }
      res.status(400).json({ message: error.message });
    }
  };

const deleteCouponById = async (req, res) => {
  try {
    const couponId = req.params.id;
    const coupon = await Coupon.findByIdAndDelete(couponId);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    res.json({ message: "Coupon deleted successfully", coupon });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCouponById,
  deleteCouponById,
};
