const crypto = require("crypto");
const Payment = require("../models/payment")
const Razorpay = require("razorpay");
// const bookappointmentController = require("../controllers/bookappointment")

// import Razorpay from "razorpay";

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


exports.checkout = async (req, res) => {
    console.log(`data: ${req.body.amount}`);
    const options ={
        amount:Number(req.body.amount*100),
        currency:"INR",
    };
    const order = await instance.orders.create(options);
    console.log(order);
    res.status(200).json({
        success:true,order
    })
};

exports.paymentVerification = async (req, res) => {
    console.log("req.body",req.body)

    const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
    const body = razorpay_order_id + "|" +razorpay_payment_id;
    const expectedsgnature =crypto.createHmac('sha256',process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest('hex')
    const isauth = expectedsgnature === razorpay_signature;
    if(isauth){
     await Payment.create({
         razorpay_order_id,razorpay_payment_id,razorpay_signature 
     })
     res.redirect(`http://localhost:3000/yourorders`)
    }
    else{
     res.status(400).json({success:false});
    }
};



// exports.checkout = async (req, res) => {
//     console.log(`data: ${req.body.amount}`);
//     try {
//         const options = {
//             amount: Number(req.body.amount * 100),
//             currency: "INR",

//         };
//         const order = await instance.orders.create(options);

//         console.log("order",order)

//         res.status(200).json({
//             success: true,
//             order,
//         });
//     } catch (error) {
//         // Handle the error appropriately
//         console.error("An error occurred during checkout:", error);
//         res.status(500).json({
//             success: false,
//             error: "An error occurred during checkout",
//             message:error.message
//         });
//     }
// };


// exports.paymentVerification = async (req, res) => {
//     console.log("req.body",req.body)

//     const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
//    const body = razorpay_order_id + "|" +razorpay_payment_id;
//    const expectedsignature = crypto
//                                 .createHmac('sha256',process.env.RAZORPAY_KEY_SECRET)
//                                 .update(body.toString())
//                                 .digest('hex')
//    const isauth = expectedsignature === razorpay_signature;
//    if(isauth){
//     await Payment.create({
//         razorpay_order_id,razorpay_payment_id,razorpay_signature 
//     })
//     res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`)
//    }
//    else{
//         res.status(400).json({
//         success: false,
//         message: 'Payment verification failed',
//         requestBody: req.body,
//         expectedSignature: expectedsignature
//     });
//    }
// };


exports.getkey= async (req,res)=>
{
    return res.status(200).json({key:process.env.RAZORPAY_KEY_ID})
};






// exports.paymentVerification = async (req, res) => {

//     console.log("req.body",req.body)
    
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//   req.body;

// const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//         .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//         .update(body.toString())
//         .digest("hex");
//         console.log("Expected Signature:", expectedSignature);
//         console.log("Received Signature:", razorpay_signature);
//     const isAuthentic = expectedSignature === razorpay_signature;


//     if (isAuthentic) {
//         // Database comes here

//         await Payment.create({
//             razorpay_order_id,
//             razorpay_payment_id,
//             razorpay_signature,
//         });

//         // res.redirect(
//         //     `${process.env.BASEURL}booking-complete?reference=${razorpay_payment_id}`
//         // );
//     } else {
//         res.status(400).json({
//             success: false,
//         });
//     }
// };





// exports.paymentVerification = async (req, res) => {

//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//       req.body;
  
//       console.log("req",req.body);
//     const body = razorpay_order_id + "|" + razorpay_payment_id;
  
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.testSECRET)
//       .update(body.toString())
//       .digest("hex");
  

//       console.log('expectedSignature',expectedSignature);

//     const isAuthentic = expectedSignature === razorpay_signature;
  
//     if (isAuthentic) {
//       // Database comes here
  
//       await Payment.create({
//         razorpay_order_id,
//         razorpay_payment_id,
//         razorpay_signature,
//       });
  
//       res.json({message:"success"})
//       res.redirect(
//         `http://localhost:3000/complate?reference=${razorpay_payment_id}`
//       );
//     } else {
//       res.status(400).json({
//         success: false,
//       });
//     }
//   };


// exports.paymentVerification = async (req, res) => {
//     try {
//         console.log("Request Body:", req.body);
//         const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//         const body = razorpay_order_id + "|" + razorpay_payment_id;

//         const expectedSignature = crypto
//             .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//             .update(body.toString())
//             .digest("hex");

//         console.log("Expected Signature:", expectedSignature);
//         console.log("Received Signature:", razorpay_signature);

//         const isAuthentic = expectedSignature === razorpay_signature;

//         if (isAuthentic) {
//             // Database operation (e.g., saving payment details) should be placed here
//             // await Payment.create({...});

//             // Return success response
//             res.status(200).json({
//                 success: true,
//             });
//         } else {
//             // Signature verification failed, return failure response
//             res.status(400).json({
//                 success: false,
//                 error: "Signature verification failed",
//             });
//         }
//     } catch (error) {
//         console.error("An error occurred during payment verification:", error);
//         res.status(500).json({
//             success: false,
//             error: "An error occurred during payment verification",
//         });
//     }
// };
