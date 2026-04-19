import path from 'path'
console.log('Server execution started...')
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import fs from 'fs'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

const NODE_ENV = process.env.NODE_ENV || 'development'

const app = express()

if (NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '/frontend/build')
  console.log(`Checking for frontend build at: ${buildPath}`)

  // Check if build directory exists (optional but helpful for debugging)
  // We won't use fs.existsSync here to avoid blocking, but the static middleware will fail silently if not found.
  // So we explicitly log it.
  if (fs.existsSync(buildPath)) {
    console.log('Frontend build found.')
  } else {
    console.error('CRITICAL ERROR: Frontend build NOT found at ' + buildPath)
  }

  app.use(express.static(buildPath))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const startServer = async () => {
  try {
    await connectDB()
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold)

    if (NODE_ENV === 'production') {
      process.exit(1)
    }

    console.log('Continuing without database in development mode'.yellow.bold)
  }

  app.listen(
    PORT,
    console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold)
  )
}

startServer()
