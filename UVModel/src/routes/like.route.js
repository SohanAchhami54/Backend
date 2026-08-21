import express from 'express' 
import { isProtected } from '../middleware/auth.middleware.js'
import { toggleCommentLike, toggleVideoLike } from '../controller/like.controller.js'

const router = express.Router() 

router.patch('/togglelikevideo/:videoId',isProtected,toggleVideoLike) 
router.patch('/togglecommentlike/:commentId',isProtected,toggleCommentLike)

export default router 