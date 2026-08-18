import express from 'express' 
import {getAllVideos, getVideoById, updateVideo,videoUpload } from '../controller/video.controller.js'
import { isProtected } from '../middleware/auth.middleware.js'
import { upload } from '../middleware/multer.middleware.js'
const router= express.Router() 

router.post('/videoupload',isProtected,upload.fields([
    {name:'videofile',maxCount:1}, 
    {name:'thumbnail',maxCount:1}
]),videoUpload)

router.patch('/updatevideo/:videoId',isProtected,upload.single('thumbnail'),updateVideo)
router.get('/getallvideo',isProtected,getAllVideos)
router.get('/getonevideo/:videoId',isProtected,getVideoById)
export default router