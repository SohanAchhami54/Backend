 import jwt from 'jsonwebtoken'
 const verifyJwt=(token)=>{
    return jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
 } 

 
 const verifyRefreshToken=async(token)=>{
    return jwt.verify(token,process.env.REFRESH_TOKEN_SECRET)
 }

 export {verifyJwt,verifyRefreshToken}