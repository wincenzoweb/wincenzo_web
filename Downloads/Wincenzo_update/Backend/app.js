require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const morgan = require("morgan");
const path = require("path");
app.use(morgan("dev"));
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
// Load environment variables
const PORT = process.env.PORT || 5000;

// Import routes
// Import user routes
const userRoutes = require("./routes/userRoutes");
// Import category routes
const categoryRoutes = require("./routes/categoryRoutes");
// Import products routes
const productRoutes = require("./routes/productsRoutes");
// Import whislist routes
const wishListRoutes = require("./routes/wishlistRoutes");
// Import cart routes
const cartRoutes = require("./routes/cartRoutes");
// Import  order routes
const orderRoutes = require("./routes/orderRoutes");
// Import orderAssignment
const orderAssignment = require("./routes/orderAssignmentRoutes");
const blogRoutes = require("./routes/blogroutes");
const homePage = require("./routes/homepageRoutes");
const aboutPage = require("./routes/aboutRoute");
const inquiryRoutes = require("./routes/inquiryroutes");
const TermsAndConditions = require("./routes/TermsAndConditions");
const policyRoutes = require("./routes/privacyPolicy");
const orgPage = require("./routes/org");
const payment = require("./routes/paymentRoute");
const ShippingAndDelivery = require("./routes/shippingDeliveryRoute");
const cancellationAndRefund = require("./routes/cancellationAndRefundRoute");
const Settings = require("./routes/settingsRoutes");
const Subscriber = require("./routes/subscribeRoute");
const Message = require("./routes/messageRoute");
const ReviewVideos = require("./routes/ReviewVideoRoute")
const AdvertisementVideo = require("./routes/advertisementVideoRoutes")
const Coupon = require("./routes/couponRoutes");


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", ["*"]);
//   res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

// Routes
app.get("/", (req, res) => {
  res.send("Hello, server Connected");
});

app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/wishlist", wishListRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/orderAssignments", orderAssignment);
app.use("/api/blog", blogRoutes);
app.use("/api/homepage", homePage);
app.use("/api/aboutpage", aboutPage);
app.use("/api/orgpage", orgPage);
app.use("/api/inquiry", inquiryRoutes);
app.use("/api/conditions", TermsAndConditions);
app.use("/api/policy", policyRoutes);
app.use("/api/payment", payment)
app.use("/api/shippinganddelivery", ShippingAndDelivery)
app.use("/api/cancellationandrefund", cancellationAndRefund)
app.use("/api/settings", Settings)
app.use("/api/subscriber", Subscriber)
app.use("/api/message", Message)
app.use("/api/reviewvideo", ReviewVideos)
app.use("/api/advertisementvideo", AdvertisementVideo)
app.use("/api/coupons", Coupon);

// app.use("/api/filters", filterRoutes);

// Connect to MongoDB and start the server

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

start();
