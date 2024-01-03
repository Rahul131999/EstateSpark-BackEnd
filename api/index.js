import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import cors from "cors"
import cookieParser from "cookie-parser";

dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB sorted!!")
}).catch((err)=>{
    console.log(err)
})

const App = express();

App.use(express.json());

App.use(cors())

App.use(cookieParser());

App.listen(process.env.PORT,()=>{
    console.log("server is up on 3000!!");
})

App.use("/api/users", userRouter)
App.use("/api/auth", authRouter)


App.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error"

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})