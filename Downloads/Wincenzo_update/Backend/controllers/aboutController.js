const aboutPage = require("../models/about");
const multer = require("multer");
const fs = require("fs");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const productFolderPath = `public/about`;
//     if (!fs.existsSync(productFolderPath)) {
//       fs.mkdirSync(productFolderPath, { recursive: true });
//     }
//     cb(null, productFolderPath);
//   },
//   filename: function (req, file, cb) {
//     console.log(file);
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage: storage }).fields([
//   { name: "certificateImage" },
// ]);

const addData = async (req, res) => {
  let { certificate, products , title,description} = req.body;

  products = JSON.parse(products);

  try {
    const about = new aboutPage({
      certificate: [],
      products,
      title,
      description,
    });




    req.files.forEach((file, index) => {
      about.certificate.push({
        certificateImage:
          // req.protocol + "://" + req.get("host") + 
          "/about/" + file.filename,
        certificateSmallTitle: req.body.certificateSmallTitle[index],
        certificateTitle: req.body.certificateTitle[index],
        certificateDescription: req.body.certificateDescription[index],
      });
    });

    await about.save();
    res.status(200).json({ message: "About information added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const allData = async (req, res) => {
  try {
    let data = await aboutPage.find().populate("products");

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getaboutPageById = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = await aboutPage.findById(ID);
    if (!data) {
      return res.status(404).json({ message: "About Page not found" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateData = async (req, res) => {
  try {
    const ID = req.params.id;
     let {
       certificateSmallTitle,
       certificateTitle,
       certificateDescription,
       title,
       description,
       products
     } = req.body;
     products = JSON.parse(products);
     const certificateImages = req.files.map((file) => ({
       certificateImage:
        //  req.protocol + "://" + req.get("host") + 
         "/about/" + file.filename,
     }));

     const about = await aboutPage.findByIdAndUpdate(
       ID,
       {
         $set: {
           products: products,
           title: title,
           description: description,
           certificate: certificateImages.map((image, index) => ({
             ...image,
             certificateSmallTitle: certificateSmallTitle[index],
             certificateTitle: certificateTitle[index],
             certificateDescription: certificateDescription[index],
           })),
         },
       },
       { new: true }
     );

     res.json({ data: about, message: "About Page is Updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deleteAboutpageId = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = await aboutPage.findByIdAndDelete(ID);
    if (!data) {
      return res.status(404).json({ message: "About page not found" });
    }
    res.json({ message: "About Page deleted successfully", count: 1 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  addData,
  allData,
  getaboutPageById,
  updateData,
  deleteAboutpageId,
};
