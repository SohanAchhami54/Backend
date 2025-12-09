import mongoose from "mongoose"

const Todoschema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    }

},{timestamps:true})//it give us created at and updated at

export const Todo=mongoose.model("Todo",Todoschema)