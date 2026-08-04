import { User } from '../models/user.model.js'
import { createUser, findUserByEmailorName, findUserId } from '../services/auth.js'
import { Apierror } from '../utils/Apierror.js'
import { Apireponse } from '../utils/Apiresponse.js'
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
   const avatarlocalpath= req.files?.avatar[0]?.path  
   const coveragelocalpath= req.files?.coverimage[0]?.path
   
   if(!avatarlocalpath) throw new Apierror(400,'AvatarLocalfiles not found.')
   

   //cloudinary upload.
   const avatar= await uploadonCloudinary(avatarlocalpath) 
   const coverimage= await uploadonCloudinary(coveragelocalpath) 

   if(!avatar) throw new Apierror(400,'Avatar file is required')
   
   
  const user= await createUser(fullname,email,username,password,avatar,coverimage) 

  const createdUser= await findUserId(user)  
  if(!createdUser) throw new Apierror(500,'User not Created.')
  

  return res.status(201).json(new Apireponse(200,createdUser,'User Register.'))

}) 

export {userRegister}