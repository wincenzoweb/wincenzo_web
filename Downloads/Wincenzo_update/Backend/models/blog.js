const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title:{
        type: String,
        require:true
    },
    description:{
        type: String,
        require:true
    },
    image:{
        type:String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
    {
        timestamp:true
    }
);

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;