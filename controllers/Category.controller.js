import {handleError} from "../helpers/handleError.js"
import Category from "../models/category.model.js"
export const addCategory = async (req, res, next) => {
    try{
        const {name, slug} = req.body
        const category = new Category({
            name,slug
        })
        await category.save()
        res.status(200).json({
            success: true,
            message: 'Category added successfully'
        })
    }catch(error){
        next(handleError(500,error.message))
    }
}
//-------------------------------------------------------------------------------
//SHOW CATEGORY
export const showCategory = async(req,res,next) => {
    try{
        const {categoryid} = req.params
        const category = await Category.findById(categoryid)
        if(! category){
            next(handleError(404,'Data not found'))
        }
        res.status(200).json({
            category
        })
    }catch (error){
        next(handleError(500,error.message))
    }
}
//------------------------------------------------------------------------------
//UPDATE CATEGORY
export const updateCategory = async (req,res,next) => {
    try{
        const {name,slug} = req.body
        const {categoryid} = req.params
        const category = await Category.findByIdAndUpdate(categoryid,{
            name,slug
        },{name: true})
        res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            category
        })
    }catch(error){
        next(handleError(500,error.message))
    }
}
//------------------------------------------------------------------------------
//DELETE CATEGORY
export const deleteCategory = async(req,res,next) =>{
    try{
        const {categoryid} = req.params
        await Category.findByIdAndDelete(categoryid)
        res.status(200).json({
            success: true,
            message: 'Category Deleted successfully',
        })
    }catch(error){
        next(handleError(500,error.message))
    }
}
//-------------------------------------------------------------------------------
//GET ALL CATEGORY
export const getAllCategory = async (req,res,next) => {
    try {
        const category = await Category.find().sort({name:1}).lean().exec()
        res.status(200).json({
            category
        })
    }catch(error){
        next(handleError(500,error.message))
    }
}