import { createUser, findUserByEmail } from "../services/auth.js";
import { Apierror } from "../utils/Apierror.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import { Asyncerror } from "../utils/Asyncerror.js";

const userRegister=Asyncerror(async(req,res)=>{
    const {name,email,address}=req.body 
    if(!name || !email || !address) throw new Apierror(400,'All field are required')  


    const existingUser= await findUserByEmail(email) 
    if(existingUser) throw new Apierror(409,'User is created with this email')
        
    const result = await createUser(name,email,address) 
    if(!result) throw new Apierror(400,'User not created')
 
    console.log('the value of user is:',result)
    
    return res.status(200)
    .json(new Apiresponse(200,{id:result.insertId,name,email,address},"user register successfully"))

})

export {userRegister}