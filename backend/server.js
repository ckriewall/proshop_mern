import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import morgan from 'morgan'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import orderRoutes from './routes/orderRoutes.js'
import productRoutes from './routes/productRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import userRoutes from './routes/userRoutes.js'

// access environment variables, connect to Mongo, start Express
dotenv.config()
connectDB()
const app = express()

// morgan middleware - log HTTP requests to console in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// express.json middleware - allow express to pull json from req.body
app.use(express.json())

// confirm express is online if GET is sent to root
app.get('/', (req, res) => {
  res.send('API is running....')
})

// pass routing to route handlers
app.use('/api/orders', orderRoutes)
app.use('/api/products', productRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/users', userRoutes)

// endpoint to return paypal client id
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

// create a static folder to contain uploads
// this path holds images uploaded by Admin
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// middleware to handle 404s and errors
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
