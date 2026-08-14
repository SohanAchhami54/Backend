import { createUser, findExistingUser } from "../services/user.services.js";
import { Apierror } from "../utils/Apierror.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import { Asyncerror } from "../utils/Asyncerror.js";

const userRegister=Asyncerror(async(req,res)=>{
   const {name,email,password,address,phone} = req.body  
   if(!name || !email || !password || ! address || !phone){
    throw new Apierror(400,'All field are required')
   }

   const existingUser= await findExistingUser(email) 
   if(existingUser) {
    throw new Apierror(409,'User with this email already exists') 
   }

   const user = await createUser(name,email,password,address,phone)
   if(!user){
     throw new Apierror(400,'User not created')
   }

   return res.status(200)
   .json(
    new Apiresponse(200,user,'User created successfully')
   )
})


export {userRegister}