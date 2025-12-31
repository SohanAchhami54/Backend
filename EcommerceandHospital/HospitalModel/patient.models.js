import mongoose from "mongoose";
const patientSchema=new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   address:{
    type:String,
    required:true
   },
   diagnosedwith:{
     type:String,
     required:true
   },
   bloodGroup:{
    type:String,
    required:true
   },
   age:{
    type:Number,
    required:true
   },
  gender:{
    type:String,
    enum:['Male','Female'],
    required:true
  },
 hospitalName:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Hospital',
    required:true
 }

},{timestamps:true})
export const Patient=mongoose.models('Patient',patientSchema)