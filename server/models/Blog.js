const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    timeCreated: {
        type:Date,
        default: ()=>Date.now()
    },
    img:{
        type: String,
        default: "placeHolder.jpg"
    },
    name:{
        type:String,
        required: true
    },
    option:{
        type:String,
        required: true
    }
})

const Blog = mongoose.model("Blog", blogSchema)
module.exports = { Blog }