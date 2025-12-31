import mongoose from 'mongoose';
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    productImage:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        default:0,
        required:true
    },
    stock:{
        type:String,
        default:0,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})
export const Product=mongoose.models('Product',productSchema)