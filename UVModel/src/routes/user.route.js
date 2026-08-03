import express from 'express' 
import { userRegister } from '../controller/user.controller.js'
import { upload } from '../middleware/multer.middleware.js'
const router=express.Router() 

router.post('/register',upload.fields([
    {name:'avatar',maxCount:1}, 
    {name:'coverimage',maxCount:1}
]), userRegister)

export default router