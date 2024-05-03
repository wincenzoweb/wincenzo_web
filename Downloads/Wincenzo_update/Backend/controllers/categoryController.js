const Category = require('../models/category');
const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/category/'); // Directory where uploaded category images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // File naming convention
  }
});

const upload = multer({ storage: storage }).single('image'); // 'image' is the field name in the form


// Create Category
const createCategory = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ message: "Error uploading image" });
      } else if (err) {
        return res.status(500).json({ message: err.message });
      }


      const { name, description } = req.body;
      const image = req.file ? req.file.path : null;


      // Construct the URL to the image without the "public" part
      const imageURL =
        // req.protocol +
        // "://" +
        // req.get("host") +
        // "/" +
        path.relative("public", image);

      const category = new Category({ name, description, image: imageURL });
      await category.save();

      res
        .status(201)
        .json({ message: "Category created successfully", category });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// Get all Categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    const categoriesCount = categories.length;
    res.status(200).json({ totalCategories: categoriesCount, categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Category by ID
const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Category by ID
const updateCategoryById = async (req, res) => {
  try {



upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ message: "Error uploading image" });
      } else if (err) {
        return res.status(500).json({ message: err.message });
      }


      
      var image = req.file ? req.file.path : req.body.image;


      // Construct the URL to the image without the "public" part

      if(req.file){

        let imageURL =
          // req.protocol +
          // "://" +
          // req.get("host") +
          // "/" +
          path.relative("public", image);
          req.body.image = imageURL;
        }
        const categoryId = req.params.id;
        const updateData = req.body;
        const category = await Category.findByIdAndUpdate(categoryId, updateData, { new: true });
        if (!category) {
          return res.status(404).json({ message: 'Category not found',category });
        }
        res.json({ message: 'Category updated successfully', category });
    })










    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Category by ID
const deleteCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByIdAndDelete(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' , category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById
};
