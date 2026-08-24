import express from 'express' 
import { isProtected } from '../middleware/auth.middleware'
import { toggleSubscription } from '../controller/subscription.controller'

const router = express.Router() 

router.patch('/togglesubscription/:channelId',isProtected,toggleSubscription)

export default router 