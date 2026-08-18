import express from 'express' 
import {deleteVideo, getAllVideos, getVideoById, togglePublishStatus, updateVideo,videoUpload } from '../controller/video.controller.js'
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
router.patch('/togglepublishstatus/:videoId',isProtected,togglePublishStatus)
router.delete('/deletevideo/:videoId',isProtected,deleteVideo)
export default router
