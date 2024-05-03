const AdvertisementVideo = require("../models/advertisementVideo"); // Updated require statement

const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const productFolderPath = `public/advertisementVideo`;
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
    { name: "advertisementVideoUrl" },
    { name: "advertisementVideoThumbnail" }
]);

const addAdvertisementVideo = async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json({ message: "Error uploading images" });
            } else if (err) {
                return res.status(500).json({ message: err.message });
            }

            // Extracting data from request body
            const {
                advertisementVideoTitle,
                advertisementVideoDescription,
            } = req.body;

            // Extract uploaded files
            const advertisementVideoUrl = req.files["advertisementVideoUrl"] ? "/advertisementVideo/" + req.files["advertisementVideoUrl"][0].filename : null;
            const advertisementVideoThumbnail = req.files["advertisementVideoThumbnail"] ? "/advertisementVideo/" + req.files["advertisementVideoThumbnail"][0].filename : null;

            // Create a new AdvertisementVideo document 
            const newAdvertisementVideo = await AdvertisementVideo.create({
                advertisementVideoUrl: advertisementVideoUrl,
                advertisementVideoThumbnail: advertisementVideoThumbnail,
                advertisementVideoTitle: advertisementVideoTitle,
                advertisementVideoDescription: advertisementVideoDescription,
            });

            // Respond with the created AdvertisementVideo document 
            res.json({ advertisementVideo: newAdvertisementVideo, message: "New Advertisement Video is Uploaded" });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateAdvertisementVideo = async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json({ message: "Error uploading images" });
            } else if (err) {
                return res.status(500).json({ message: err.message });
            }

            // Extracting data from request body
            const {
                advertisementVideoTitle,
                advertisementVideoDescription,
            } = req.body;

            // Extract uploaded files
            const advertisementVideoUrl = req.files["advertisementVideoUrl"] ? "/advertisementVideo/" + req.files["advertisementVideoUrl"][0].filename : null;
            const advertisementVideoThumbnail = req.files["advertisementVideoThumbnail"] ? "/advertisementVideo/" + req.files["advertisementVideoThumbnail"][0].filename : null;

            // Find the advertisement video by ID to get old URLs
            const advertisementVideoId = req.params.id;
            const oldAdvertisementVideo = await AdvertisementVideo.findById(advertisementVideoId);

            // Create or update advertisement video object
            const advertisementVideoData = {
                advertisementVideoTitle: advertisementVideoTitle,
                advertisementVideoDescription: advertisementVideoDescription,
            };

            // Delete old files if new ones are uploaded
            if (advertisementVideoUrl && oldAdvertisementVideo.advertisementVideoUrl) {
                fs.unlinkSync(`public${oldAdvertisementVideo.advertisementVideoUrl}`);
            }
            if (advertisementVideoThumbnail && oldAdvertisementVideo.advertisementVideoThumbnail) {
                fs.unlinkSync(`public${oldAdvertisementVideo.advertisementVideoThumbnail}`);
            }

            // Add new URLs to advertisement video data
            if (advertisementVideoUrl) {
                advertisementVideoData.advertisementVideoUrl = advertisementVideoUrl;
            }
            if (advertisementVideoThumbnail) {
                advertisementVideoData.advertisementVideoThumbnail = advertisementVideoThumbnail;
            }

            // Update the advertisement video
            const updatedAdvertisementVideo = await AdvertisementVideo.findByIdAndUpdate(advertisementVideoId, advertisementVideoData, { new: true });

            // Check if advertisement video exists
            if (!updatedAdvertisementVideo) {
                return res.status(404).json({ message: "Advertisement Video not found" });
            }

            // Respond with the updated advertisement video
            res.json({ message: "Advertisement Video updated successfully", advertisementVideo: updatedAdvertisementVideo });
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const getAllAdvertisementVideos = async (req, res) => {
    try {
        // Fetch all advertisement videos 
        const advertisementVideos = await AdvertisementVideo.find({});

        // Respond with all advertisement videos 
        res.json({ advertisementVideos });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAdvertisementVideo = async (req, res) => {
    try {
        const advertisementVideoId = req.params.id;

        // Find the advertisement video by ID
        const advertisementVideo = await AdvertisementVideo.findById(advertisementVideoId);
        if (!advertisementVideo) {
            return res.status(404).json({ message: "Advertisement Video not found" });
        }

        // Delete associated files
        if (advertisementVideo.advertisementVideoUrl) {
            fs.unlinkSync(`public${advertisementVideo.advertisementVideoUrl}`);
        }
        if (advertisementVideo.advertisementVideoThumbnail) {
            fs.unlinkSync(`public${advertisementVideo.advertisementVideoThumbnail}`);
        }

        // Delete the advertisement video from the database
        await AdvertisementVideo.findByIdAndDelete(advertisementVideoId);

        res.json({ message: "Advertisement Video deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    addAdvertisementVideo,
    updateAdvertisementVideo,
    getAllAdvertisementVideos,
    deleteAdvertisementVideo
};
