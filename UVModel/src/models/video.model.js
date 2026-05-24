import mongoose from 'mongoose' 

const userSchema=new mongoose.Schema({
    videofile:{
        type:String, 
        required:true,
    }, 
    thumbnail:{
        type:String, 
        required:true, 
    },
    owner:{
       type:mongoose.Schema.Types.ObjectId, 
       ref:'User'
    },
    title:{
        type:String , 
        required:true,   
    }, 
    description:{
        type:String, 
        required:true, 
    }, 
    duration:{
        type:Number, 
        required:true, 
    }, 
    views:{
        type:Number, 
        default:0, 
    },
    isPublished:{
        type:Boolean, 
        default:false
    }
},{timestamps:true})

export const User=mongoose.model('User',userSchema)