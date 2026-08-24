import express from 'express' 
import { isProtected } from '../middleware/auth.middleware.js'
import { createTweet } from '../controller/tweet.controller.js'
const router = express.Router() 

router.post('/createtweet',isProtected,createTweet)

export default router