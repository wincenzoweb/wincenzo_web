const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  addOrg,
  getAllOrg,
  getOrgById,
  updateOrgById,
  removeOrgById,
} = require("../controllers/orgController");

   router.post(
     "/",
     authMiddleware.authenticateUser,
     authMiddleware.checkUserRole(["admin"]),
     addOrg
   );
router.get("/", getAllOrg);
router.get("/:id", getOrgById);
router.put(
  "/:id",
  authMiddleware.authenticateUser,
  authMiddleware.checkUserRole(["admin"]),
  updateOrgById
);
router.delete(
  "/:id",
  authMiddleware.authenticateUser,
  authMiddleware.checkUserRole(["admin"]),
  removeOrgById
);

module.exports = router;
