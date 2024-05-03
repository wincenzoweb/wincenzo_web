
const ReviewVideo = require("../models/ReviewVideo"); // Updated require statement

const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const productFolderPath = `public/reviewVideo`;
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
    { name: "reviewVideoUrl" },
    { name: "reviewVideoThumbnail" }
]);

const addReviewVideo = async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json({ message: "Error uploading images" });
            } else if (err) {
                return res.status(500).json({ message: err.message });
            }

            // Extracting data from request body
            const {
                reviewVideoTitle,
                reviewVideoDescription,
            } = req.body;

            // Extract uploaded files
            const reviewVideoUrl = req.files["reviewVideoUrl"] ? "/reviewVideo/" + req.files["reviewVideoUrl"][0].filename : null;
            const reviewVideoThumbnail = req.files["reviewVideoThumbnail"] ? "/reviewVideo/" + req.files["reviewVideoThumbnail"][0].filename : null;

            // Create a new ReviewVideo document 
            const newReviewVideo = await ReviewVideo.create({
                reviewVideoUrl: reviewVideoUrl,
                reviewVideoThumbnail: reviewVideoThumbnail,
                reviewVideoTitle: reviewVideoTitle,
                reviewVideoDescription: reviewVideoDescription,
            });

            // Respond with the created ReviewVideo document 
            res.json({ reviewVideo: newReviewVideo, message: "New Review Video is Uploaded" });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateReviewVideo = async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json({ message: "Error uploading images" });
            } else if (err) {
                return res.status(500).json({ message: err.message });
            }

            // Extracting data from request body
            const {
                reviewVideoTitle,
                reviewVideoDescription,
            } = req.body;

            // Extract uploaded files
            const reviewVideoUrl = req.files["reviewVideoUrl"] ? "/reviewVideo/" + req.files["reviewVideoUrl"][0].filename : null;
            const reviewVideoThumbnail = req.files["reviewVideoThumbnail"] ? "/reviewVideo/" + req.files["reviewVideoThumbnail"][0].filename : null;

            // Find the review video by ID to get old URLs
            const reviewVideoId = req.params.id;
            const oldReviewVideo = await ReviewVideo.findById(reviewVideoId);

            // Create or update review video object
            const reviewVideoData = {
                reviewVideoTitle: reviewVideoTitle,
                reviewVideoDescription: reviewVideoDescription,
            };

            // Delete old files if new ones are uploaded
            if (reviewVideoUrl && oldReviewVideo.reviewVideoUrl) {
                fs.unlinkSync(`public${oldReviewVideo.reviewVideoUrl}`);
            }
            if (reviewVideoThumbnail && oldReviewVideo.reviewVideoThumbnail) {
                fs.unlinkSync(`public${oldReviewVideo.reviewVideoThumbnail}`);
            }

            // Add new URLs to review video data
            if (reviewVideoUrl) {
                reviewVideoData.reviewVideoUrl = reviewVideoUrl;
            }
            if (reviewVideoThumbnail) {
                reviewVideoData.reviewVideoThumbnail = reviewVideoThumbnail;
            }

            // Update the review video
            const updatedReviewVideo = await ReviewVideo.findByIdAndUpdate(reviewVideoId, reviewVideoData, { new: true });

            // Check if review video exists
            if (!updatedReviewVideo) {
                return res.status(404).json({ message: "Review Video not found" });
            }

            // Respond with the updated review video
            res.json({ message: "Review Video updated successfully", reviewVideo: updatedReviewVideo });
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const getAllReviewVideos = async (req, res) => {
    try {
        // Fetch all review videos 
        const reviewVideos = await ReviewVideo.find({});

        // Respond with all review videos 
        res.json({ reviewVideos });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteReviewVideo = async (req, res) => {
    try {
        const reviewVideoId = req.params.id;

        // Find the review video by ID
        const reviewVideo = await ReviewVideo.findById(reviewVideoId);
        if (!reviewVideo) {
            return res.status(404).json({ message: "Review Video not found" });
        }

        // Delete associated files
        if (reviewVideo.reviewVideoUrl) {
            fs.unlinkSync(`public${reviewVideo.reviewVideoUrl}`);
        }
        if (reviewVideo.reviewVideoThumbnail) {
            fs.unlinkSync(`public${reviewVideo.reviewVideoThumbnail}`);
        }

        // Delete the review video from the database
        await ReviewVideo.findByIdAndDelete(reviewVideoId);

        res.json({ message: "Review Video deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    addReviewVideo,
    updateReviewVideo,
    getAllReviewVideos,
    deleteReviewVideo
};
