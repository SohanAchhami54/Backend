import express from 'express' 
import { changePassword, generateNewAccessRefreshToken, getCurrentUser, updateAccountDetails, updateAvatarImage, updateCoverImage, userLogin, userLogout, userRegister } from '../controller/user.controller.js'
import { upload } from '../middleware/multer.middleware.js'
import { isProtected } from '../middleware/auth.middleware.js'
const router=express.Router() 

router.post('/register',upload.fields([
    {name:'avatar',maxCount:1}, 
    {name:'coverimage',maxCount:1}
]), userRegister)

router.post('/login',userLogin)  
router.post('/reset-token',generateNewAccessRefreshToken)
router.post('/changepassword',isProtected,changePassword) 
router.get('/getcurrentuser',isProtected,getCurrentUser) 
router.patch('/updateuser',isProtected,updateAccountDetails)

router.patch('/updateavatarimage',isProtected,upload.single('avatar'),updateAvatarImage) 
router.patch('/updatecoverimage',isProtected,upload.single('coverimage'),updateCoverImage)

router.post('/logout',isProtected,userLogout) 

export default router
