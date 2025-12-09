import mongoose from "mongoose";
import { User } from "./user.models";

const Subtodoschema=new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    isChecked:{
        type:Boolean,
        required:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
    }
},{timestamps:true})


export const Subtodo=mongoose.model("Subtodo",Subtodoschema)