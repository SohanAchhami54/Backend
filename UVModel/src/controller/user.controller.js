import { User } from '../models/user.model.js'
import { createUser, findUserByEmailorName, findUserId, generateAccessandRefreshToken, logoutUser, userDetails } from '../services/auth.js'
import { Apierror } from '../utils/Apierror.js'
import { Apiresponse } from '../utils/Apiresponse.js'
import {Asyncerror} from '../utils/Asyncerror.js'
import { uploadonCloudinary } from '../utils/cloudinary.js'

const userRegister=Asyncerror(async(req,res,next)=>{
  
   const {fullname,email,username,password}=req.body  

   //all field are required.
   if([fullname,email,username,password].some((field)=>field.trim()==="")){
      throw new Apierror(400,'All field are required') 
   }
    
   //find existingUser
   const existingUser=await findUserByEmailorName(email,username) 
   if(existingUser)  throw new Apierror(409,'User already Created.')
   
 
 // avatar and coverageimage
   const avatarlocalpath= req.files?.avatar?.[0]?.path  
   const coveragelocalpath= req.files?.coverimage?.[0]?.path
   
   if(!avatarlocalpath) throw new Apierror(400,'AvatarLocalfiles not found.')
   

   //cloudinary upload.
   const avatar= await uploadonCloudinary(avatarlocalpath) 
   const coverimage= await uploadonCloudinary(coveragelocalpath) 

   if(!avatar) throw new Apierror(400,'Avatar file is required')
   
   
  const user= await createUser(fullname,email,username,password,avatar,coverimage) 

  const createdUser= await findUserId(user)  
  if(!createdUser) throw new Apierror(500,'User not Created.')
  

  return res.status(201).json(new Apiresponse(200,createdUser,'User Register.'))

}) 



const userLogin=Asyncerror(async(req,res,next)=>{
  const {email,username,password}=req.body  

  if(!email && !username) throw new Apierror(400,'username or email is required')
  
  //find User
  const existingUser= await findUserByEmailorName(email,username) 
  if(!existingUser) throw new Apierror(404,'User doesnot exists cannot login') 

  //password check
  const isPasswordMatch=await existingUser.comparePassword(password) 
  if(!isPasswordMatch) throw new Apierror(401,'Password do not match')

  //access and refresh token 
  const {accesstoken,refreshtoken}=await generateAccessandRefreshToken(existingUser._id)
   
  const userLogin=await  userDetails(existingUser._id)

  const options={
    httpOnly:true,
    secure:true, 
    sameSite:'strict'
  }
  return res.status(200)
  .cookie('accessToken',accesstoken,options) 
  .cookie('refreshToken',refreshtoken,options)
  .json(
    new Apiresponse(
      200,
      {
        user:userLogin,accesstoken,refreshtoken
      },
      "User logged In"
    )
  )
})

const userLogout=Asyncerror(async(req,res)=>{ 
   await logoutUser(req.user._id)
    const options={
    httpOnly:true,
    secure:true, 
    sameSite:'strict'
  }

  return res.status(200)
  .clearCookie('accessToken',options)
  .clearCookie('refreshToken',options) 
  .json(new Apiresponse(200,{},'User logged out successfully'))

})


export {userRegister,userLogin,userLogout}