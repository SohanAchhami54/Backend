import { User } from "../models/user.model.js"

const findUserByEmailorName=async(email,username)=>{
    const userbyen= await User.findOne({
        $or:[
            {email},
            {username}
        ]
    }) 
    return userbyen 
} 

const  findUserId=async(user)=>{
    const userbyid= await User.findById(user._id).select('-password -refreshToken')
    return userbyid
}

const generateAccessandRefreshToken=async(userid)=>{
   const user=await User.findById(userid) 
   const accesstoken= user.generateAccessToken() 
   const refreshtoken=user.generateRefreshToken() 

   user.refreshToken=refreshtoken 
   await user.save({validateBeforeSave:false}) 
   return {
       accesstoken
       ,refreshtoken
 }
}

const userDetails=async(userid)=>{
    return await User.findById(userid).select('-password -refreshToken')
}

const logoutUser=async(userid)=>{
  await User.findByIdAndUpdate(userid, 
    {
        $set:{
            refreshToken:undefined
        },
    },{
        returnDocument:'after'
    }
  )
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
    return user
}

export {findUserByEmailorName,createUser,findUserId,generateAccessandRefreshToken,userDetails,logoutUser}