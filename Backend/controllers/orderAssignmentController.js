// controllers/orderAssignmentController.js
const OrderAssignment = require("../models/orderAssignment");
const Order = require("../models/order");
const User = require("../models//user");
const Product = require("../models/products");

// Create a new assignment
const assignOrder = async (req, res) => {
  try {
    const { orderId, deliveryBoyId, status } = req.body;

    const order = await Order.findById(orderId)
      .populate("user")
      .populate("products.product.name");
    if (!order) {
      return res
        .status(400)
        .json({ message: `Order with ID ${orderId} not found` });
    }
    const customer = order.user;
    if (!customer) {
      return res
        .status(400)
        .json({ message: `Customer with ID ${order.user} not found` });
    }

    const user = await User.findById(customer._id);
    if (!user) {
      return res
        .status(400)
        .json({ message: `User with ID ${customer._id} not found` });
    }
    const productData = order.products.map((item) => ({
      product: item.product,
      quantity: item.quantity,
    }));

    // let Check = await
    const assignment = new OrderAssignment({
      orderId,
      user: customer._id,
      deliveryBoyId,
      status,
    });
    await assignment.save();

    res.status(201).json({
      message: "Order assigned successfully",
      assignment,
      products: productData,
      assign_Order_BY: req.user._id,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getuserDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Retrieve assignments by delivery boy ID
const getAssignmentsByDeliveryBoyId = async (req, res) => {
  try {
    const deliveryBoyId = req.params.deliveryBoyId;
    const assignments = await OrderAssignment.find({ deliveryBoyId })
      .populate(
        {
          path: 'orderId',
          populate: {
            path: 'products.product',
            model: 'Product'
          }
        })
      // .populate("orderId")
      .populate("user");
    // .populate("deliveryBoyId");
    // .populate("orderId.products.product", "name price thumbnailImage");
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update assignment status
const updateAssignmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const assignment = await OrderAssignment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json({ assignment, message: "Order Status updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete assignment
const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await OrderAssignment.findByIdAndDelete(id);
    res.json({ message: "Assignment deleted successfully", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all assignments
const getAllAssignments = async (req, res) => {
  try {
    const assignments = await OrderAssignment.find()
      .populate("orderId")
      .populate("user")
      .populate("deliveryBoyId")
      .populate("orderId.products.product", "name price thumbnailImage");

    if (!assignments) {
      res.status(404).json({ message: "Assignment not found" });
    }
    res.json({
      totalOrderAssignments: assignments.length,
      assignments,
      message: "All assignments Found ",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders assigned to a delivery boy
const getOrdersAssignedToDeliveryBoy = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const assignments = await OrderAssignment.find({ orderId })

      .populate("user")
      .populate("deliveryBoyId")
      .populate("orderId");

    if (!assignments) {
      res.json({ message: "Assignment not found" });
    }
    res.json({ totalOrderAssignments: assignments.length, assignments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  assignOrder,
  getAssignmentsByDeliveryBoyId,
  updateAssignmentStatus,
  deleteAssignment,
  getAllAssignments,
  getuserDetails,

  getOrdersAssignedToDeliveryBoy,
};
