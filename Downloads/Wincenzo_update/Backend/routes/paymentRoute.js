
var express = require("express");
var router = express.Router();
const paymentController = require("../controllers/paymentController");
// const userController = require("../controller/user");


router.post(
    "/paymentverification",
    paymentController.paymentVerification
);

router.post("/checkout", paymentController.checkout);

router.get("/keyid",paymentController.getkey);


module.exports = router;

