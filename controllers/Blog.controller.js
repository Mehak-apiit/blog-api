import cloudinary from "../config/cloudinary.js"
import { handleError } from "../helpers/handleError.js"
import Blog from "../models/blog.model.js"
import { encode } from 'entities'// BLOG CONTENT KO SAFE BNANE K LIYE
import Category from "../models/category.model.js"
//---------------------------------------------------------------------------------------------------
//ADD A BLOG
export const addBlog = async (req, res, next) => {
    try {
        const data = JSON.parse(req.body.data)
        let featuredImage = ''// image k liye variable 
        // agar image ayi too featuredImage mei url jayega nahi too empty rehega ye
        if (req.file) { // check ki kya image ayi ya nahi
            // upload an image
            const uploadResult = await cloudinary.uploader
                .upload(
                    req.file.path,
                    { folder: 'yt-mern-blog', resource_type: 'auto' }
                )
                .catch((error) => {
                    next(handleError(500, error.message))
                });
            folderImage = uploadResult.secure_url
        }
        const blog = new Blog({
            author: data.author,
            category: data.category,
            title: data.title,
            slug: `${data.slug}-${Math.round(Math.random() * 100000)}`,
            featuredImage: featuredImage,
            blogContent: encode(data.blogContent),
        })
        await blog.save()
        res.status(200).json({
            success: true,
            message: 'Blog added successfully'
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}
//----------------------------------------------------------------------------------------------------
//EDIT BLOG
export const editBlog = async (req, res, next) => {
    try {
        const { blogid } = req.params
        const blog = await Blog.findById(blogid).populate('category', 'name')
        if (!blog) {
            next(handleError(404, 'Data not found'))
        }
        res.status(200).json({
            blog
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}
//------------------------------------------------------------------------------------------------------
//UPDATE BLOG
export const updateBlog = async (req, res, next) => {
    try {
        const { blogid } = req.params
        const data = JSON.parse(req.body.data)
        const blog = await Blog.findById(blogid)
        blog.category = data.category
        blog.title = data.title
        blog.slug = data.slug
        blog.blogContent = encode(data.blogContent)
        let featuredImage = blog.featuredImage
        if (req.file) {
            const uploadResult = await cloudinary.uploader
                .upload(
                    req.file.path,
                    { folder: 'yt-mern-blog', resource_type: 'auto' }
                )
                .catch((error) => {
                    next(handleError(500, error.message))

                });
            featuredImage = uploadResult.secure_url
        }
        blog.featuredImage = featuredImage
        await blog.save()
        res.status(200).json({
            success: true,
            message: 'Blog updated successfully'
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}
//-------------------------------------------------------------------------------------------------
// DELETE BLOG
export const deleteBlog = async (req, res, next) => {
    try {
        const { blogid } = req.params
        await Blog.findByIdAndDelete(blogid)
        res.status(200).json({
            success: true,
            message: 'Blog Deleted successfully',
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}
//-------------------------------------------------------------------------------------------------
// SHOW ALL BLOG
export const showAllBlog = async (req, res, next) => {
    try {
        const user = req.user
        let blog;
        if (user.role === 'admin') {
            blog = (await Blog.find().populate('author', 'name avatar role').populate('category', 'name slug')).sort({ createdAt: -1 }).lean().exec()

        } else {
            blog = (await Blog.find({ author: user._id }).populate('author', 'name avatar role').populate('category', 'name slug')).sort({ createdAt: -1 }).lean().exec()

        }
        res.status(200).json({
            blog
        })
    } catch (error) {
        next(handleError(500, error.message))
    }

}
//---------------------------------------------------------------------------------------------------
// GET ALL BLOG
export const getRealtedBlog = async (req,res,next)=>{
    try{
        const {category,blog}=req.params
        const categoryData = await Category.findOne({slug:category})
        if(!categoryData){
            return next(404,'Category data not found')
        }
        const categoryId = categoryData._id
        const relatedBlog = await Blog.find({category:categoryId, slug: {$ne:blog}}).lean().exec()
        res.status(200).json({
            relatedBlog
        })
    }catch(error){
        next(handleError(500,error.message))
    }
}
//----------------------------------------------------------------------------------------------------
//GET BLOG BY CATEGORY
export const getBlogByCategory = async (req,res,next) => {
    try{
        const{category} = req.params
        const categoryData = await Category.findOne({slug: category})
        if(!categoryData){
            return next(404,'Category')
        }
        const categoryId = categoryData._id
        const blog = await Blog.find({category:categoryId}).populate('author','name avatar role').populate('category','name slug').lean().exec()
        res.status(200).json({
            blog,
            categoryData
        })
    }catch(error){
        next(handleError(500,error.message))
    }
}
//--------------------------------------------------------------------------------------------------
// SEARCH
export const search = async(req,res,next)=> {
    try{
        const{q} = req.query
        const blog = await Blog.find({title : {$regex: q, $options: 'i'}}).populate('author','name avatar role').populate('category','name slug').lean().exec()
        res.status(200).json({
            blog,
        })
    }catch(error){
        next(handleError(500,error.message))
    }
}
//----------------------------------------------------------------------------------------------------
//GET ALL BLOGS
export const getAllBlogs = async(req,res,next)=>{
    try{
        const user = req.user
        const blog = await Blog.find().populate('author','name avatar role').populate('category','name slug').sort({createdAt:-1}).lean().exec()
        res.status(200).json({
            blog
        })
    }catch(error){
        next(handleError(500,error.message))
    }
}
// GET ALL 