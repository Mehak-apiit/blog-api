import {handleError} from "../helpers/handleError.js"
import Blog from "../models/blog.model.js"
import Category from "../models/category.model.js"
//---------------------------------------------------------------------------------------------------
//ADD A BLOG
export const addBlog = async (req, res, next) => {
    try{
        const data = JSON.parse(req.body.data)
        let featuredImage = ''
        if(req.file){
            // upload an image
            const uploadResult = await
        }
    }
}