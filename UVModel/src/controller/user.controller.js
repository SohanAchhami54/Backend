import {Asyncerror} from '../utils/Asyncerror.js'
const userRegister=Asyncerror(async(req,res,next)=>{
  res.status(200).json({success:'ok'})
})
export {userRegister}