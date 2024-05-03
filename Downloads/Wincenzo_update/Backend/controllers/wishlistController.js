const Wishlist = require("../models/wishlist");

// Create a new wishlist item
const createWishlistItem = async (req, res) => {
  try {
    const { productId, userId } = req.body;

    // Validate input
    if (!productId || !userId) {
      return res
        .status(400)
        .json({ message: "ProductId and userId are required" });
    }

    // Check if the product already exists in the user's wishlist
    let wishlistItem = await Wishlist.findOne({
      product: productId,
      user: userId,
    });

    if (wishlistItem) {
      // If the product already exists in the user's wishlist, return the existing wishlist item
      return res
        .status(200)
        .json({ wishlistItem, message: "Product already in wishlist" });
    }

    // If the product doesn't exist in the user's wishlist, create a new wishlist item
    wishlistItem = new Wishlist({ product: productId, user: userId });
    await wishlistItem.save();

    res
      .status(201)
      .json({ wishlistItem, message: "Product added to wishlist" });
  } catch (error) {
    console.error("Error creating wishlist item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all wishlist items for a user
const getWishlistItemsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const wishlistItems = await Wishlist.find({ user: userId }).populate(
      "product"
    );
    const wishlistCount = wishlistItems.length;
    res.status(200).json({ wishlistCount, wishlistItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove a wishlist item
const removeWishlistItem = async (req, res) => {
  try {
    const wishlistItemId = req.params.id;
    const deletedItem = await Wishlist.findByIdAndDelete(wishlistItemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Wishlist item not found" });
    }
    res.json({ message: "Wishlist item deleted successfully", count: 1 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getWishlistItemsByUser,
  removeWishlistItem,
  createWishlistItem,
};
