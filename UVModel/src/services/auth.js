import { User } from "../models/user.model.js"
import { Apierror } from "../utils/Apierror.js"

const findUserByEmailorName=async(email,username)=>{
    return User.findOne({
        $or:[
            {email},
            {username}
        ]
    })    
} 

const  findUserId=async(userid)=>{
    return User.findById(userid) 
}

const generateAccessandRefreshToken=async(userid)=>{
   const user=await User.findById(userid)  
   if(!user) throw new Apierror(404,'User not found')
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
    return User.findById(userid).select('-password -refreshToken')
}

const logoutUser=async(userid)=>{
  return User.findByIdAndUpdate(userid, 
    {
        $unset:{refreshToken:1},
    },{
        returnDocument:'after'
    }
  )
} 


const saveNewPassword=async(user,newPassword)=>{
   user.password=newPassword 
   await user.save() //we must use await here.
} 

const updateUserDetails=async(userid,fullname,email)=>{  
   return User.findByIdAndUpdate(userid, 
    {
        $set:{fullname, email}
    },{
        returnDocument:'after' //return the updated user.
    }
   ).select('-password -refreshToken')
}  

const findUserForAccountUpdate=async(userid,email)=>{
   return  User.findOne({
    email,
    _id:{$ne:userid}
})
}

const updateImageUrl=async(userid,imageurl)=>{
   return User.findByIdAndUpdate(userid,{
      $set:{avatar:imageurl},
    },
    {returnDocument:'after'}
).select('-password -refreshToken')
}


const createUser=async(fullname,email,username,password,avatar,coverimage)=>{
    const user= await User.create({
        fullname, 
        email,
        avatar:avatar.url, 
        coverimage:coverimage?.url || '', 
        username:username.toLowerCase(), 
        password, 
    }) 
    return user
}

export {findUserByEmailorName,createUser,findUserId,generateAccessandRefreshToken,userDetails,logoutUser,saveNewPassword,updateUserDetails,findUserForAccountUpdate,updateImageUrl}