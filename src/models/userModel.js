import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    mobileNo:{
        type:Number,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    gender: {
        type: String,
        default:null
    },
    
    dateOfBirth: {
        type: Date,
        default:null  
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    },
    {timestamps:true}
);

const User = mongoose.models.users || mongoose.model("users",userSchema);

export default User;