const express = require("express");
const homepageController = require("../controllers/homepage.controller");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const productFolderPath = `public/homepage`;
    if (!fs.existsSync(productFolderPath)) {
      fs.mkdirSync(productFolderPath, { recursive: true });
    }
    cb(null, productFolderPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage }).fields([
  { name: "banerImages" },
  { name: "featureImage" },
  { name: "higlightProductImage" },
  { name: "videoUrl" },
  { name: "brandImage", maxCount: 6 },
  // { name: "footerLogo" },
]);

router.post(
  "/",
  authMiddleware.authenticateUser,
  authMiddleware.checkUserRole(["admin"]),
  homepageController.addData
);
router.get("/", homepageController.allData);
router.get("/:id", homepageController.gethomePageById);
router.put(
  "/:id",
  authMiddleware.authenticateUser,
  authMiddleware.checkUserRole(["admin"]),
  homepageController.updateData
);
router.delete(
  "/:id",
  authMiddleware.authenticateUser,
  authMiddleware.checkUserRole(["admin"]),
  homepageController.deleteHomepageId
);

module.exports = router;
