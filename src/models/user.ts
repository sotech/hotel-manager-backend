import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    fullname: String
})

const UserModel = mongoose.model("User", userSchema);

export {UserModel};