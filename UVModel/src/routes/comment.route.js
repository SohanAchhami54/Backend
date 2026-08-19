import express from 'express' 
import { isProtected } from '../middleware/auth.middleware.js'
import { addComment, getVideoComments } from '../controller/comment.controller.js'

const router = express.Router() 

router.get('/getallcomments/:videoId',isProtected,getVideoComments)
router.post('/addcomment/:videoId',isProtected,addComment)
export default router