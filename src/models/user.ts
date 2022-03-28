import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:String,
    email: String,
    password: String,
    fullname: String
})

const UserModel = mongoose.model("User", userSchema);

export {UserModel};