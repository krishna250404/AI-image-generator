import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import PostRouter from "./routes/posts.js";
import generateImageRouter from "./routes/generate.js";

dotenv.config({path:"./.env"});

const app = express();
app.use(cors());
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended:"true"}));

//error handling
app.use((errr, req, res, next)=>{
    const status = errr.status || 500;
    const message = errr.message || "something went wrong";
    return res.status(status).json({
        success: false, 
        status, 
        message,
    });
});

app.use("/api/post", PostRouter);
app.use("/api/generateImage", generateImageRouter)
//default get
app.get("/", async (req, res)=>{
    res.status(200).json({
        message: "Hello Developers"
    });
});

//connect mogodb to server
const connectdb=()=>{
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("mongoDB connected"))
    .catch((err)=>{
        console.error("Failed to connect");
        console.error(err);
    });
};

 //function to start the server
 const startserver = async () =>{
    try{
        connectdb();
        app.listen(8080, ()=> console.log("server started 8080"));
    }catch(error){
        console.log(error);
    }
};
startserver();