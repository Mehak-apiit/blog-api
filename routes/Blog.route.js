import express from 'express'
import {addBlog, deleteBlog,editBlog,getAllBlogs,getBlogByCategory,getRealtedBlog,search,showAllBlog,updateBlog} from '../controllers/Blog.controller.js'
import upload from '../config/multer.js'
import { authenticate } from '../middleware/authenticate.js'

import Blog from '../models/blog.model.js'
const BlogRoute = express.Router()
BlogRoute.post('/add',authenticate,upload.single('file'),addBlog)
BlogRoute.get('/edit/:blogid',authenticate,editBlog)
BlogRoute.put('/update/:blogid',authenticate,upload.single('file'),updateBlog)
BlogRoute.delete('/delete/:blogid',authenticate,deleteBlog)
BlogRoute.get('/get-all',authenticate,showAllBlog)

BlogRoute.get('/get-related-blog/:category/:blog',getRealtedBlog)
BlogRoute.get('/get-blog-by-category/:category',getBlogByCategory)
BlogRoute.get('/search',search)
BlogRoute.get('/blogs',getAllBlogs)
export default BlogRoute
