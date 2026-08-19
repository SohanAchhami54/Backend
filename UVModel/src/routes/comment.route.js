import express from 'express' 
import { isProtected } from '../middleware/auth.middleware.js'
import { addComment, deleteCommentcontent, getVideoComments, updateCommentcontent } from '../controller/comment.controller.js'

const router = express.Router() 

router.get('/getallcomments/:videoId',isProtected,getVideoComments)
router.post('/addcomment/:videoId',isProtected,addComment) 
router.patch('/updatecomment/:commentId',isProtected,updateCommentcontent)
router.delete('/deletecomment/:commentId',isProtected,deleteCommentcontent)
export default router