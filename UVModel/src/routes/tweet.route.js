import express from 'express' 
import { isProtected } from '../middleware/auth.middleware.js'
import { createTweet, getUserTweets, updateTweet } from '../controller/tweet.controller.js'
const router = express.Router() 

router.post('/createtweet',isProtected,createTweet) 
router.get('/getusertweet',isProtected,getUserTweets) 
router.patch('/updatetweet/:tweetId',isProtected,updateTweet)

export default router