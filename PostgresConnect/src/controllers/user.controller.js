import { createUser, findUserByEmail } from "../services/auth.js";
import { Apierror } from "../utils/Apierror.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import { Asyncerror } from "../utils/Asyncerror.js";

const userRegister=Asyncerror(async(req,res)=>{
    const {name,email,password}=req.body   
    if(!name || !email || !password) throw new Apierror(400,'All field are required') 
    
    const existingUser= await findUserByEmail(email) 
    if(existingUser) throw new Apierror(400,'All field are required')

    const user = await createUser(name,email,password) 
    if(!user) throw new Apierror(400,'User not created') 

    return res.status(200) 
    .json(new Apiresponse(200,user,'User Created Successfully'))

})

export {userRegister}