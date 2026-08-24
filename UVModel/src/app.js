import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRouter from './routes/user.route.js'  
import videoRouter from './routes/video.route.js'
import commentRouter from './routes/comment.route.js' 
import likeRouter from './routes/like.route.js' 
import tweetRouter from './routes/tweet.route.js'
import { errorMiddleware } from './middleware/error.middleware.js'
const app = express()

const corsOptions = {
  origin: [process.env.FRONTEND_URL],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
};

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json({ limit: '16KB' }))
app.use(express.urlencoded({ extended: true, limit: '32KB' }))
app.use(express.static('public'))

// Routes
app.use('/api/v1/users', userRouter) 
app.use('/api/v1/video',videoRouter)
app.use('/api/v1/comment',commentRouter) 
app.use('/api/v1/like',likeRouter) 
app.use('/api/v1/tweet',tweetRouter)

app.get('/', (req, res) => {
  res.send('Hello from backend')
})
app.use(errorMiddleware)
export default app;

