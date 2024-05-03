const Blog = require('../models/blog');
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/blog')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({ storage: storage }).single('image');

const createBlog = async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json({ message: "Error uploading images" });
            } else if (err) {
                return res.status(500).json({ message: err.message });
            }
            let { title, description } = req.body;

            let check = await Blog.findOne({ title: req.body.title })

            if (check) {
                res.json({ message: "Blog is Alredy Uploaded" });
            }
            const image = req.file ? req.file.path : null;

            const imageURL =

                "/" +
                path.relative("public", image);

            check = await Blog.create({
                title,
                description,
                image: imageURL,
            });
            res.json({ check, message: "New Blog is Upload" });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllblog = async (req, res) => {
    try {
        const blogs = await Blog.find();
        const blogsCount = blogs.length;
        res.status(200).json({ totalblogs: blogsCount, blogs, massage: "All Blog Founded.." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getBlogById = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateBlogById = async (req, res) => {
    try {

        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json({ message: "Error uploading image" });
            } else if (err) {
                return res.status(500).json({ message: err.message });
            }

            var image = req.file ? req.file.path : req.body.image;

            // Construct the URL to the image without the "public" part

            if (req.file) {

                let imageURL =

                    "/" +
                    path.relative("public", image);
                req.body.image = imageURL;
            }

            const blogId = req.params.id;
            const blog = await Blog.findByIdAndUpdate(blogId, req.body, { new: true });
            if (!blog) {
                return res.status(404).json({ message: "Blog not found" });
            }
            res.json({ message: "Blog updated successfully", blog });
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteBlogById = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findByIdAndDelete(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.json({ message: "Blog deleted successfully", count: 1 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    createBlog,
    getAllblog,
    getBlogById,
    updateBlogById,
    deleteBlogById
}