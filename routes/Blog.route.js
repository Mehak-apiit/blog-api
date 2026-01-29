import express from 'express'
import {addBlog, deleteBlog,editBlog,getAllBlogs,getBlogByCategory,getRealtedBlog,search,showAllBlog,updateBlog} from '../controllers/Blog.controller.js'
import Blog from '../models/blog.model.js'
const BlogRoute = express.Router()
BlogRoute.post('/add',addBlog)
BlogRoute.get('/edit/:blogid',editBlog)
BlogRoute.put('/update/:blogid',updateBlog)
BlogRoute.delete('/delete/:blogid',deleteBlog)
BlogRoute.get('/get-all',showAllBlog)

BlogRoute.get('/get-related-blog/:category/:blog',getRealtedBlog)
BlogRoute.get('/get-blog-by-category/:category',getBlogByCategory)
BlogRoute.get('/search',search)
BlogRoute.get('/blogs',getAllBlogs)
export default BlogRoute
