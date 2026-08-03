import { User } from "../models/user.model.js"

const findUserByEmailorName=async(email,username)=>{
    const user=await User.find({
        $or:[
            {email},
            {username}
        ]
    })
} 

const  findUserId=async(user)=>{
    const user= await User.findById(user._id).select('-password -refreshToken')
    return user
}

const createUser=async(fullname,email,username,password,avatar,coverimage)=>{
    const user=await User.create({
        fullname, 
        email,
        avatar:avatar.url, 
        coverimage:coverimage?.url || '', 
        username:username.toLowerCase(), 
        password, 
    })
}

export {findUserByEmailorName,createUser,findUserId}