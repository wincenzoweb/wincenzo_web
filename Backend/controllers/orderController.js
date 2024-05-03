const crypto = require("crypto");
const Order = require("../models/order");
const Product = require("../models/products");
const User = require("../models/user");
const Razorpay = require("razorpay");
const ID = process.env.RAZORPAY_KEY_ID;
const secret = process.env.RAZORPAY_KEY_SECRET;
const razorpay = new Razorpay({
  key_id: ID,
  key_secret: secret,
});


const createOrder = async (req, res) => {
  try {
    let { userId, shippingAddress, products, paymentMethod } = req.body;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: `User with ID ${userId} not found` });
    }

    // Check if the provided shipping address matches any existing shipping address for the user
    const matchingAddress = user.shippingAddresses.find(address => {
      return (
        address.label === shippingAddress.label &&
        address.address === shippingAddress.address &&
        address.country === shippingAddress.country &&
        address.state === shippingAddress.state &&
        address.city === shippingAddress.city &&
        address.zipCode === shippingAddress.zipCode
      );
    });

    // If a matching address is found, proceed to create the order without saving the shipping address again
    if (matchingAddress) {
      // Calculate total price of the order
      let total = 0;
      for (const item of products) {
        const product = await Product.findById(item.product);
        if (!product) {
          return res.status(400).json({ message: `Product with ID ${item.product} not found` });
        }
        total += product.price * item.quantity;
      }

      // Create the order without saving the shipping address
      const order = new Order({ shippingAddress, products, total, user, paymentMethod });
      await order.save();

      return res.status(201).json({ message: "Order created successfully", success: true, order });
    }

    // If no matching address is found, save the shipping address and then create the order
    user.shippingAddresses.push(shippingAddress);
    await user.save();

    // Calculate total price of the order
    let total = 0;
    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({ message: `Product with ID ${item.product} not found` });
      }
      total += product.price * item.quantity;
    }

    // Create the order
    const order = new Order({ shippingAddress, products, total, user, paymentMethod });
    await order.save();

    res.status(201).json({ message: "Order created successfully", success: true, order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(400).json({ message: error.message });
  }
};










// Retrieve all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("products.product", "name price thumbnailImage");
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "Orders not found" });
    }
    res.json({ totalOrders: orders.length, orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve order by ID
const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId)
      .populate("user", "username")
      .populate("products.product", "name price");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve orders by user ID
const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.id;
    const orders = await Order.find({ user: userId })
      .populate("user", "username")
      .populate("products.product", "name price");
    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "Orders not found for this user" });
    }
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handle payment status
const paymentStatus = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.testSECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Handle payment success here
      res.redirect(
        `http://localhost:5000/order-complete?reference=${razorpay_payment_id}`
      );
    } else {
      res
        .status(400)
        .json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order by ID
const updateOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updateData = req.body;

    const order = await Order.findById(orderId).populate({
      path: 'user',
      model: 'User',
      select: '-password'
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if the shipping address is being updated
    if (updateData.shippingAddress) {
      // Update shipping address in the order
      order.shippingAddress = updateData.shippingAddress;

      // Update shipping address in the user's list of addresses
      const user = await User.findById(order.user._id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the new shipping address already exists in the user's list
      let addressExists = false;
      for (const address of user.shippingAddresses) {
        if (
          address.label === updateData.shippingAddress.label &&
          address.address === updateData.shippingAddress.address &&
          address.country === updateData.shippingAddress.country &&
          address.state === updateData.shippingAddress.state &&
          address.city === updateData.shippingAddress.city &&
          address.zipCode === updateData.shippingAddress.zipCode
        ) {
          addressExists = true;
          break;
        }
      }
      // If it's not already in the list, add it
      if (!addressExists) {
        user.shippingAddresses.push(updateData.shippingAddress);
        await user.save();
      }
    }

    // Update other fields if provided
    order.set(updateData);

    // Recalculate total
    let total = 0;
    for (const item of order.products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({
          message: `Product with ID ${item.product} not found for order ${orderId}`,
        });
      }
      total += product.price * item.quantity;
    }
    order.total = total;

    // Save the updated order
    const updatedOrder = await order.save();

    res.json({ message: "Order updated successfully", order: updatedOrder });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};














// Delete order by ID
const deleteOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getUserOrders,
  paymentStatus,
  updateOrderById,
  deleteOrderById,
};