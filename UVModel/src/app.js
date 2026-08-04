import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRouter from './routes/user.route.js'
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
app.use('/users/v1', userRouter)

app.get('/', (req, res) => {
  res.send('Hello from backend')
});

export default app;

