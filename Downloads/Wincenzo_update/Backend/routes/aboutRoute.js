const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  addData,
  updateData,
  deleteAboutpageId,
  allData,
  getaboutPageById,
} = require("../controllers/aboutController");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/about");
  },
  filename: function (req, file, cb) {
    
    const uniqueSuffix = Date.now() +"-"+ Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

// const cpUpload = upload.fields([
//   { name: "galleryImages", maxCount: 10 },+
//   { name: "thumbnailImage", maxCount: 1 }, // Single thumbnail image
// ]);
router.post(
  "/",
  upload.array("certificateImage", 10),
  authMiddleware.authenticateUser,
  authMiddleware.checkUserRole(["admin"]),
  addData
);
router.get("/", allData);+
router.get("/:id", getaboutPageById);
router.put(
  "/:id",
  upload.array("certificateImage", 10),
  authMiddleware.authenticateUser,
  authMiddleware.checkUserRole(["admin"]),
  updateData
);
router.delete(
  "/:id",
  authMiddleware.authenticateUser,
  authMiddleware.checkUserRole(["admin"]),
  deleteAboutpageId
);

module.exports = router;
