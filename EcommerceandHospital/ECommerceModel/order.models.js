import mongoose from 'mongoose';

const orderItemSchema=new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
     
    quantity:{
        type:Number,
        required:true,
    }
})
const orderSchema=new mongoose.Schema({
   orderPrice:{
    type:Number,
    required:true
   },
   customer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
   },
   orderItems:{
     type:[orderItemSchema],
     required:true
   },
   address:{
    type:String,
    required:true
   },
   status:{
    type:String,
    enum:['Pending','Confirmed','Cancelled'],
    default:'Pending'
   }

},{timestamps:true})    

export const Order=mongoose.models('Order',orderSchema)