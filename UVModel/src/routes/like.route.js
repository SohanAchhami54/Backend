import express from 'express' 
import { isProtected } from '../middleware/auth.middleware.js'
import { getLikedVideos, toggleCommentLike, toggleTweetLike, toggleVideoLike } from '../controller/like.controller.js'

const router = express.Router() 

router.patch('/togglelikevideo/:videoId',isProtected,toggleVideoLike) 
router.patch('/togglecommentlike/:commentId',isProtected,toggleCommentLike)
router.patch('/toggletweetlike/:tweetId',isProtected,toggleTweetLike)
router.get('/getlikedvideos',isProtected,getLikedVideos)
export default router 