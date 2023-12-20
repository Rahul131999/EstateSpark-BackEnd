import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRoute from "./routes/user.route.js"

dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB sorted!!")
}).catch((err)=>{
    console.log(err)
})

const App = express();

App.listen(process.env.PORT,()=>{
    console.log("server is up on 3000!!");
})

App.use("/api/users", userRoute)