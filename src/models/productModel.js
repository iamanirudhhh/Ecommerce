import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
        productName:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        category:{
            type:String,
            required:true
        },
        status:{
            type:String,
            required:true,
            default:null
        },
    },
    {timestamps:true}
);

const Products = mongoose.models.products || mongoose.model("products",productSchema);

export default Products;    