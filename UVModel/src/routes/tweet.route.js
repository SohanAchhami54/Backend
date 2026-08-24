import express from 'express' 
import { isProtected } from '../middleware/auth.middleware.js'
import { createTweet, getUserTweets } from '../controller/tweet.controller.js'
const router = express.Router() 

router.post('/createtweet',isProtected,createTweet) 
    router.get('/getusertweet',isProtected,getUserTweets)

export default router