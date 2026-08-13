import User from "../model/user.model.js"

const createUser=async(name,email,password)=>{
   const user = await User.create({name,email,password}) 
   return user
}

const findUserByEmail=async(email)=>{
   return User.findOne({where:{email}})
}


export {createUser,findUserByEmail}