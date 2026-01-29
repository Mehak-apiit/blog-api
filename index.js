import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from "./config/db.js"
import AuthRoute from './routes/Auth.route.js'
import CategoryRoute from './routes/Category.route.js'
import BlogRoute from './routes/Blog.route.js'
connectDB();
dotenv.config()
const PORT = process.env.PORT
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors())

// route setup
app.use('/api/auth',AuthRoute)
app.use('/api/category',CategoryRoute)
app.use('api/blog',BlogRoute)
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})

// TO HANDLE THE ERROR
app.use((err,req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error'
    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
})