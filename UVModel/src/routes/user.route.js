import express from 'express' 
import { userLogin, userLogout, userRegister } from '../controller/user.controller.js'
import { upload } from '../middleware/multer.middleware.js'
import { isProtected } from '../middleware/auth.middleware.js'
const router=express.Router() 

router.post('/register',upload.fields([
    {name:'avatar',maxCount:1}, 
    {name:'coverimage',maxCount:1}
]), userRegister)

router.post('/login',userLogin) 
router.post('/logout',isProtected,userLogout) 

export default router