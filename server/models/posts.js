import mongoose from "mongoose";
const PostSchema = new mongoose.Schema({
    author:{
        type:String,
        required: true,
    },
    prompt:{
        type:String,
        required: true,
    },
    photo:{
        type:String,
        required: true,
    },
});

const Post = mongoose.model("post", PostSchema);

export default Post;