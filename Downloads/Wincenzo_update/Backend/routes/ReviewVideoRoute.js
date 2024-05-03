

// const express = require('express');
// const router = express.Router();
// const reviewVideoController = require("../controllers/ReviewVideoController");
// const authMiddleware = require('../middleware/authMiddleware');

// router.post("/", authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), reviewVideoController.addReviewvideo);
// router.get("/", reviewVideoController.getAllReviewvideos);
// router.put("/:id", authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), reviewVideoController.updateReviewvideo);
// router.delete("/:id", authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), reviewVideoController.deleteReviewvideoById);

// // router.post('/addReviwvideo', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), reviewVideoController.addReviwvideo);

// // router.put('/updateReviwvideo/:id', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), reviewVideoController.updateReviwvideo);

// // router.get('/', reviewVideoController.getReviwvideos);


// module.exports = router;


const express = require('express');
const router = express.Router();
const reviewVideoController = require('../controllers/ReviewVideoController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to add a new review video 
router.post('/',authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), reviewVideoController.addReviewVideo);

// Route to update an existing review video 
router.put('/:id',authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), reviewVideoController.updateReviewVideo);

// Route to get all review videos 
router.get('/', reviewVideoController.getAllReviewVideos);

// Route to delete a review video 
router.delete('/:id',authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), reviewVideoController.deleteReviewVideo);

module.exports = router;

