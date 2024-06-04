import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
        userId:{
            type:String,
            required:true
        },
        addressTitle:{
            type:String,
            required:true
        },
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        addressLine:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        pincode: {
            type:Number,
            required:true
        },
        state: {
            type: String,
            required:true
        },
        mobileNo: {
            type: Number,
            required:true
        },

        byDefaultAddress: {
            type: String,
            default:false
        },
    },
    {timestamps:true}
);

const Address = mongoose.models.addresses || mongoose.model("addresses",addressSchema);

export default Address;