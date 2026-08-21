import express from 'express' 
import { isProtected } from '../middleware/auth.middleware.js'
import { toggleVideoLike } from '../controller/like.controller.js'

const router = express.Router() 

router.patch('/togglelikevideo/:videoId',isProtected,toggleVideoLike)

export default router 