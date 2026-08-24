import express from 'express' 
import { isProtected } from '../middleware/auth.middleware.js'
import { toggleSubscription } from '../controller/subscription.controller.js'

const router = express.Router() 

router.patch('/togglesubscription/:channelId',isProtected,toggleSubscription)

export default router 