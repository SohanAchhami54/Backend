import prisma from "../db/supabase.js"
import { decryptPassword } from "../utils/auth.js"


const findExistingUser=async(email)=>{
   return  prisma.user.findUnique({where:{email}})
}

const  createUser=async(name,email,password,address,phone)=>{ 
    const hashpassword = await decryptPassword(password)
    const user= await prisma.user.create({data:{name,email,password:hashpassword,address,phone}})
    return user 
}

export {findExistingUser,createUser}