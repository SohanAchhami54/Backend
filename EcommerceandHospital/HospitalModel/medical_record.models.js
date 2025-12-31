import mongoose from "mongoose";

const medicalRecordSchema=new mongoose.Schema({
   hospital:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Hospital',
    required:true
   },
   CheckedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Doctor',
    required:true
   },
   patient:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Patient',
    required:true
   },
   record:[
    {
      type:String,
      required:true
    }
   ]
   
},{timestamps:true})

export const MedicalRecord=mongoose.models('MedicalRecord',medicalRecordSchema)