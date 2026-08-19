import express from 'express' 
import { isProtected } from '../middleware/auth.middleware.js'
import { addComment, getVideoComments, updateCommentcontent } from '../controller/comment.controller.js'

const router = express.Router() 

router.get('/getallcomments/:videoId',isProtected,getVideoComments)
router.post('/addcomment/:videoId',isProtected,addComment) 
router.patch('/updatecomment/:commentId',isProtected,updateCommentcontent)
export default router