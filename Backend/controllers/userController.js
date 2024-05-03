const User = require("../models/user");
const twilio = require("twilio");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Order = require("../models/order");

// Twilio credentials
const accountSid = process.env.twilioAccountSid;
const authToken = process.env.twilioAuthToken;
const verifySid = process.env.twilioVerifySid;
const client = twilio(accountSid, authToken);

// Function to generate JWT token
const generateAuthToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const createUser = async (req, res) => {
  try {
    const { username, email, password, role, phoneNumber, shippingAddresses, images } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const existingUserName = await User.findOne({ username });
    if (existingUserName) {
      return res.status(400).json({ message: "Username is already in use" });
    }

    console.log("user", email, phoneNumber, password,)
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      role,
      phoneNumber,
      shippingAddresses,
      images
    });
    await user.save();
    console.log("user", user)
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createDeliveryBoy = async (req, res) => {
  try {
    const { username, email, password, phoneNumber } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: "deliveryboy",
      phoneNumber,
      deliveryBoy: true,
    });
    await user.save();

    res.status(201).json({ message: "Delivery boy account created successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
};

const createAdmin = async (req, res) => {
  try {
    const { username, email, password, phoneNumber } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: "admin",
      phoneNumber,
      admin: true,
    });
    await user.save();

    res
      .status(201)
      .json({ message: "Admin account created successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.messageuser });
  }
};

const createInitialAdmin = async (req, res) => {
  try {
    const { username, email, password, phoneNumber } = req.body;

    // Check if there are any existing users
    const existingUser = await User.findOne();

    // If no users exist, create the initial admin account
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        email,
        password: hashedPassword,
        role: "admin",
        phoneNumber,
        admin: true,
      });
      await user.save();

      // Generate JWT token for the admin user
      const token = generateAuthToken(user);

      res.status(201).json({ message: "Admin account created successfully", user, token });
    } else {
      res.status(400).json({ message: "Admin account already exists" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password, phoneNumber } = req.body;
    let user;
    console.log("user", email, password, phoneNumber)
    if (email) {
      user = await User.findOne({ email });
    } else if (phoneNumber) {
      user = await User.findOne({ phoneNumber });
    }

    if (!user || (password && !bcrypt.compareSync(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the user object contains the _id property
    if (!user._id) {
      return res.status(401).json({ message: 'User ID not found' });
    }

    const token = generateAuthToken(user);

    res.status(200).json({ message: 'Login successful', user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve user by ID
const getUserById = async (req, res) => {
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


const updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    let updateData = req.body;

    if (updateData.shippingAddresses && Array.isArray(updateData.shippingAddresses)) {
      updateData.shippingAddresses = updateData.shippingAddresses.map(address => {
        if (typeof address === 'object') {
          return address;
        } else {
          return JSON.parse(address);
        }
      });
    }

    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};





// Delete user by ID
const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {

  try {

    const query = req.query.user
    const users = await User.find({ role: query });
    const userCount = users.length; // Count the number of users
    res.status(200).json({ totalUsers: userCount, users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get all deliveryboy
const getAlldeliveryboy = async (req, res) => {
  try {
    const users = await User.find({ role: "deliveryboy" });
    const userCount = users.length; // Count the number of users
    res.status(200).json({ totalUsers: userCount, users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// twilio OTP validation start

const startVerification = async function (req, res) {
  try {
    const phoneNumber = req.body.phoneNumber;

    console.log("req.body", req.body);
    //send verification code only if user is registered and isActive==false

    unverifiedUser = await User.findOne({
      phoneNumber: phoneNumber,
      isActive: false,
    });

    if (unverifiedUser == null) {
      throw new Error("No Such User Exists");
    } else if (unverifiedUser.isActive == true) {
      throw new Error("User Already Verified");
    } else {
      const verification = await client.verify.v2
        .services(verifySid)
        .verifications.create({ to: phoneNumber, channel: "sms" });
      res.json({ status: verification.status });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User email not found' });
    }

    const generateOTP = () => {
      return Math.floor(100000 + Math.random() * 900000);
    };

    const otp = generateOTP();

    user.forgotPasswordOTP = otp;
    await user.save();

    console.log(otp);
    await client.messages.create({
      body: `Your OTP for password reset is: ${otp}`,
      to: user.phoneNumber
    });

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}

const resetPasswordOtpVerify = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if OTP matches
    if (!user.forgotPasswordOTP === otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // If OTP is valid, reset password
    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate(user._id, { password: hasPassword, forgotPasswordOTP: null }, { new: true });

    res.json({ message: 'Password reset successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
//=======================API endpoint to check verification code====================

const checkVerification = async function (req, res) {
  try {
    const phoneNumber = req.body.phoneNumber;
    const otpCode = req.body.otpCode;

    const verificationCheck = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: phoneNumber, code: otpCode });

    if (verificationCheck.status == "approved") {
      unverifiedUser = await User.findOneAndUpdate(
        { phoneNumber: phoneNumber },
        { $set: { isActive: true } },
        { new: true }
      );


      if (unverifiedUser == null) {
        throw new Error("No Such User Exists");
      } else {
        const token = generateAuthToken(unverifiedUser);

        res.json({
          status: verificationCheck.status,
          isActive: unverifiedUser.isActive,
          unverifiedUser,
          token,
        });
      }
    } else {
      res.json({ status: verificationCheck.status });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports = {
  createUser,

  createDeliveryBoy,
  createAdmin,
  createInitialAdmin,

  loginUser,
  getUserById,
  updateUserById,

  deleteUserById,
  getAllUsers,
  startVerification,
  checkVerification,

  resetPassword,
  resetPasswordOtpVerify,

  getAlldeliveryboy,
};