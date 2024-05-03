const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const blogControlller = require('../controllers/blog.Controller');

// router.post('/addBlog', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), blogControlller.createBlog);
router.post('/', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), blogControlller.createBlog);
// router.get('/allBlog', blogControlller.getAllblog);
router.get('/', blogControlller.getAllblog);
router.get('/:id', blogControlller.getBlogById);
router.put('/:id', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), blogControlller.updateBlogById);
router.delete('/:id', authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), blogControlller.deleteBlogById);

module.exports = router