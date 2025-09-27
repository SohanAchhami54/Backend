const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema.Types;
const todoSchema=new mongoose.Schema({
   content:{
    type:String,
    required:true,
   },
   createdBy:{
       type:ObjectId,
       ref:"User",
   },
   subTodos:[
    {
        type:ObjectId,
        ref:"SubTodos",
    } //this is the array of sub todos
   ]
},{timestamps:true});
export const Todo=mongoose.model('Todo',todoSchema); 