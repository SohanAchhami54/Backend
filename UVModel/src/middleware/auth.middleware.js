import { userDetails } from "../services/auth.js";
import { Apierror } from "../utils/Apierror.js";
import { Asyncerror } from "../utils/Asyncerror.js";
import { verifyJwt } from "../utils/auth.js";

const isProtected=Asyncerror(async(req,res,next)=>{
   const token=req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ','')  
   if(!token) throw new Apierror(400,'Token not found')

   const decodedToken=verifyJwt(token)  
   const userData=await userDetails(decodedToken?._id)  
   req.user=userData 
   next()
})

export {isProtected}    