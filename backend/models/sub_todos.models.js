const mongoose=require('mongoose');
const subTodosSchema= new mongoose.Schema({

},{timestamps:true},);

export const SubTodos=mongoose.model("SubTodos",subTodosSchema);