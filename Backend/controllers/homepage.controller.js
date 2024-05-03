const homePage = require("../models/homePage");
const multer = require("multer");
const fs = require("fs");
const Product = require("../models/products");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const productFolderPath = `public/homepage`;
    if (!fs.existsSync(productFolderPath)) {
      fs.mkdirSync(productFolderPath, { recursive: true });
    }
    cb(null, productFolderPath);
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage }).fields([
  { name: "banerImages" },
  { name: "featureImage" },
  { name: "higlightProductImage" },
  { name: "videoUrl" },
  { name: "brandImage" },
  { name: "advertisVideoUrl" },
  { name: "advertisVideoThumbnail" },
  { name: "productFeatureThumb" },
]);

const addData = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ message: "Error uploading images" });
      } else if (err) {
        return res.status(500).json({ message: err.message });
      }

      // Extracting data from request body
      let {
        homePageTitle,
        banerTitle,
        banerDescription,
        higlightProductTitle,
        higlightProductDescription,
        higlightProductImage,
        // higlightProductfeature,
        experienceTitle,
        experienceDescription,
        yearOfExperience,
        happyCustomer,
        countriesCovered,
        packageDelivered,
        topOfferLine
      } = req.body;

      // Process uploaded files
      // banerImages = req.files["banerImages"] ? "/homepage/" + req.files["banerImages"][0].filename : null;
      banerImages = [];
      if (req.files["banerImages"]) {
        req.files["banerImages"].forEach((file, index) => {
          banerImages.push(`/homepage/${file.filename}`);
        });
      }

      higlightProductImage = req.files["higlightProductImage"] ? "/homepage/" + req.files["higlightProductImage"][0].filename : null;

      // Populate brandImage array
      let brandImage = [];
      if (req.files["brandImage"]) {
        req.files["brandImage"].forEach((file, index) => {
          brandImage.push(`/homepage/${file.filename}`);
        });
      }

      // Populate feature array
      let features = [];
      if (req.files["featureImage"]) {
        req.files["featureImage"].forEach((file, index) => {
          features.push({
            featureImage: "/homepage/" + file.filename,
            featureTitle: req.body.featureTitle[index],
            featureDescription: req.body.featureDescription[index],
          });
        });
      }

      let higlightProductFeature = [];
      if (req.files["productFeatureThumb"]) {
        req.files["productFeatureThumb"].forEach((file, index) => {
          higlightProductFeature.push({
            productFeatureThumb: "/homepage/" + file.filename,
            productFeature: req.body.productFeature[index],
          });
        });
      }

      // Populate advertisement array
      let advertisement = [];
      if (req.files["advertisVideoUrl"]) {
        req.files["advertisVideoUrl"].forEach((file, index) => {
          advertisement.push({
            advertisVideoUrl: "/homepage/" + file.filename,
            advertisVideoThumbnail: "/homepage/" + req.files["advertisVideoThumbnail"][index].filename, // Add this line
            advertisVideoTitle: req.body.advertisVideoTitle[index],
            advertisVideoDescription: req.body.advertisVideoDescription[index],
          });
        });
      }

      const products = await Product.find().limit(6);

      const productGallery = products.map((product) => product._id);

      // Create new HomePage document
      const check = await homePage.create({
        homePageTitle,
        banerTitle,
        banerDescription,
        banerImages,
        feature: features,
        higlightProductTitle,
        higlightProductDescription,
        higlightProductImage,
        higlightProductFeature: higlightProductFeature,
        experienceTitle,
        experienceDescription,
        brandImage,
        yearOfExperience,
        happyCustomer,
        countriesCovered,
        packageDelivered,
        topOfferLine,
        productGallery,
        advertisement: advertisement // Populate advertisement array
      });

      // Respond with the created HomePage document
      res.json({ check, message: "New HomePage is Upload" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const allData = async (req, res) => {
  try {
    let data = await homePage.find();

    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const gethomePageById = async (req, res) => {
  try {
    const ID = req.params.id;
    const homePage = await homePage.findById(ID);
    if (!homePage) {
      return res.status(404).json({ message: "homePage not found" });
    }
    res.json(homePage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateData = async (req, res) => {
  console.log("homepageupdate", req.body);
  try {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ message: "Error uploading images" });
      } else if (err) {
        return res.status(500).json({ message: err.message });
      }

      if (req.body.banerImagesOld) {
        req.body.banerImagesOld = JSON.parse(req.body.banerImagesOld);
      }
      if (req.body.banerImagesRemove) {
        req.body.banerImagesRemove = JSON.parse(req.body.banerImagesRemove);
      }

      if (req.body.brandImageOld) {
        req.body.brandImageOld = JSON.parse(req.body.brandImageOld);
      }
      if (req.body.brandImageRemove) {
        req.body.brandImageRemove = JSON.parse(req.body.brandImageRemove);
      }
      if (req.body.featureOld) {
        req.body.featureOld = JSON.parse(req.body.featureOld);
      }
      if (req.body.featureItemRemove) {
        req.body.featureItemRemove = JSON.parse(req.body.featureItemRemove);
      }

      if (req.body.higlightProductFeatureOld) {
        req.body.higlightProductFeatureOld = JSON.parse(req.body.higlightProductFeatureOld);
      }
      if (req.body.higlightProductFeatureRemove) {
        req.body.higlightProductFeatureRemove = JSON.parse(req.body.higlightProductFeatureRemove);
      }

      if (req.body.advertisementOld) {
        req.body.advertisementOld = JSON.parse(req.body.advertisementOld);
      }
      if (req.body.advertisementItemRemove) {
        req.body.advertisementItemRemove = JSON.parse(req.body.advertisementItemRemove);
      }

      let newArrayBanerImages = [];
      req.body.banerImagesOld.forEach((el) => {
        if (!req.body.banerImagesRemove.includes(el)) {
          newArrayBanerImages.push(el);
        }
      });

      let newArray = [];
      req.body.brandImageOld.forEach((el) => {
        if (!req.body.brandImageRemove.includes(el)) {
          newArray.push(el);
        }
      });

      let featureOldIds = req.body.featureOld.map((item) => item._id);
      let featureItemRemoveIds = req.body.featureItemRemove.map(
        (item) => item._id
      );

      let newArrayFeature = [];
      featureOldIds.forEach((el) => {
        if (!featureItemRemoveIds.includes(el)) {
          let data = req.body.featureOld.filter((e) => e._id === el);
          newArrayFeature.push(...data);
        }
      });

      let higlightProductFeatureOldIds = req.body.higlightProductFeatureOld.map((item) => item._id);
      let higlightProductFeatureRemoveIds = req.body.higlightProductFeatureRemove.map(
        (item) => item._id
      );

      let newhiglightProductFeature = [];
      higlightProductFeatureOldIds.forEach((el) => {
        if (!higlightProductFeatureRemoveIds.includes(el)) {
          let data = req.body.higlightProductFeatureOld.filter((e) => e._id === el);
          newhiglightProductFeature.push(...data);
        }
      });

      let advertisementOldIds = req.body.advertisementOld.map((item) => item._id);
      let advertisementItemRemoveIds = req.body.advertisementItemRemove.map(
        (item) => item._id
      );

      let newArrayAdvertisement = [];
      advertisementOldIds.forEach((el) => {
        if (!advertisementItemRemoveIds.includes(el)) {
          let data = req.body.advertisementOld.filter((e) => e._id === el);
          newArrayAdvertisement.push(...data);
        }
      });



      // if (req.files["banerImages"]) {
      //   req.body.banerImages =
      //     "/homepage/" +
      //     req.files["banerImages"][0].filename;
      // } else {
      //   req.body.banerImages = req.body.bennerImageOld;
      // }
      if (req.files["higlightProductImage"]) {
        req.body.higlightProductImage =
          "/homepage/" +
          req.files["higlightProductImage"][0].filename;
      } else {
        req.body.higlightProductImage = req.body.higlightProductImageOld;
      }

      if (req.files["videoUrl"]) {
        req.body.videoUrl =
          "/homepage/" +
          req.files["videoUrl"][0].filename;
      } else {
        req.body.videoUrl = req.body.videoUrlOld;
      }

      let banerImages = [];
      if (req.files["banerImages"]) {
        req.files["banerImages"].forEach((file) => {
          banerImages.push(`/homepage/${file.filename}`);
        });
      }

      if (req.files["banerImages"]) {
        req.body.banerImages = banerImages;
      }

      let brandImage = [];
      if (req.files["brandImage"]) {
        req.files["brandImage"].forEach((file, index) => {
          brandImage.push(
            `/homepage/${file.filename}`
          );
        });
      }

      if (req.files["brandImage"]) {
        req.body.brandImage = brandImage;
      }

      let features = [];
      let features2 = [];
      if (req.files["featureImage"]) {
        req.files["featureImage"].forEach((file, index) => {
          features.push({
            featureImage:
              "/homepage/" +
              file.filename,
            featureTitle: req.body.featureTitle[index],
            featureDescription: req.body.featureDescription[index],
          });
        });
      } else {
        req.body?.featureTitle?.forEach((title, index) => {
          features.push({
            featureImage: req.body.featureOld[index].featureImage,
            featureTitle: title,
            featureDescription: req.body.featureDescription[index],
          });
        });
      }

      if (req.files["featureImage"]) {
        req.body.feature = features;
      }

      let higlightProductFeature = [];
      if (req.files["productFeatureThumb"]) {
        req.files["productFeatureThumb"].forEach((file, index) => {
          higlightProductFeature.push({
            productFeatureThumb:
              "/homepage/" +
              file.filename,
            productFeature: req.body.productFeature[index],
          });
        });
      } else {
        req.body?.productFeature?.forEach((title, index) => {
          higlightProductFeature.push({
            productFeatureThumb: req.body.higlightProductFeatureOld[index].productFeatureThumb,
            productFeature: title,
          });
        });
      }

      if (req.files["productFeatureThumb"]) {
        req.body.higlightProductFeature = higlightProductFeature;
      }

      let advertisement = [];
      if (req.files["advertisVideoUrl"]) {
        req.files["advertisVideoUrl"].forEach((file, index) => {
          advertisement.push({
            advertisVideoUrl:
              "/homepage/" +
              file.filename,
            advertisVideoThumbnail: "/homepage/" + req.files["advertisVideoThumbnail"][index].filename, // Add this line
            advertisVideoTitle: req.body.advertisVideoTitle[index],
            advertisVideoDescription: req.body.advertisVideoDescription[index],
          });
        });
      } else {
        req.body?.advertisVideoTitle?.forEach((title, index) => {
          advertisement.push({
            advertisVideoThumbnail: req.body.advertisementOld[index].advertisVideoThumbnail,
            advertisVideoUrl: req.body.advertisementOld[index].advertisVideoUrl,
            advertisVideoTitle: title,
            advertisVideoDescription: req.body.advertisVideoDescription[index],
          });
        });
      }

      if (req.files["advertisVideoUrl"]) {
        req.body.advertisement = advertisement;
      }

      const ID = req.params.id;

      let finalArrayBanerImages = [];
      if (req.body.banerImages?.length > 0) {
        finalArrayBanerImages = [...newArrayBanerImages, ...req.body.banerImages];
      } else {
        finalArrayBanerImages = newArrayBanerImages;
      }

      let finalArray = [];
      if (req.body.brandImage?.length > 0) {
        finalArray = [...newArray, ...req.body.brandImage];
      } else {
        finalArray = newArray;
      }

      let finalArrayFeature = [];
      if (req.body.feature?.length > 0) {
        finalArrayFeature = [...newArrayFeature, ...req.body.feature];
      } else {
        finalArrayFeature = newArrayFeature;
      }

      let finalhiglightProductFeature = [];
      if (req.body.higlightProductFeature?.length > 0) {
        finalhiglightProductFeature = [...newhiglightProductFeature, ...req.body.higlightProductFeature];
      } else {
        finalhiglightProductFeature = newhiglightProductFeature;
      }

      let finalArrayAdvertisement = [];
      if (req.body.advertisement?.length > 0) {
        finalArrayAdvertisement = [...newArrayAdvertisement, ...req.body.advertisement];
      } else {
        finalArrayAdvertisement = newArrayAdvertisement;
      }

      req.body.banerImages = finalArrayBanerImages;
      req.body.brandImage = finalArray;
      if (finalArrayFeature?.length > 0) {
        req.body.feature = finalArrayFeature;
      }
      if (finalArrayAdvertisement?.length > 0) {
        req.body.advertisement = finalArrayAdvertisement;
      }

      if (features2?.length > 0) {
        req.body.feature = features2;
      }

      const home = await homePage.findByIdAndUpdate(ID, req.body, {
        new: true,
      });
      if (!home) {
        return res.status(404).json({ message: "homePage not found" });
      }
      res.json({ message: "homePage updated successfully", home });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const deleteHomepageId = async (req, res) => {
  try {
    const ID = req.params.id;
    const HomePage = await homePage.findByIdAndDelete(ID);
    if (!HomePage) {
      return res.status(404).json({ message: "homePage not found" });
    }
    res.json({ message: "homePage deleted successfully", count: 1 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  addData,
  allData,
  gethomePageById,
  updateData,
  deleteHomepageId,
};
