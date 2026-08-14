import bcrypt from 'bcrypt' 

const  decryptPassword=async(password)=>{ 
   return bcrypt.hash(password,10)
}

const encryptPassword=async(password,hashpassword)=>{
    return bcrypt.compare(password,hashpassword)
}

export {decryptPassword,encryptPassword}