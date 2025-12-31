import mongoose from "mongoose";
const worksInHospitalSchema= new mongoose.Schema({
    hospitalname:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'Hospital'
    },
    workingHour:{
        type:Number,
        required:true
    }
})

const doctorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    qualification:{
    type:String,
    required:true
   },

   experienceInYears:{
    type:String,
    default:0,
    required:true
  },
  worksInHospital:{
    type:[worksInHospitalSchema],
    required:true
  }



},{timestamps:true})

export const Doctor=mongoose.models('Doctor',doctorSchema)