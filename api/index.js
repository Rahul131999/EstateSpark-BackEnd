import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"

dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB sorted!!")
}).catch((err)=>{
    console.log(err)
})

const App = express();

App.use(express.json());

App.listen(process.env.PORT,()=>{
    console.log("server is up on 3000!!");
})

App.use("/api/users", userRouter)
App.use("/api/auth", authRouter)