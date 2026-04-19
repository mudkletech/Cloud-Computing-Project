import mongoose from 'mongoose'
import dns from 'node:dns'

const connectDB = async () => {
  try {
    // Force public DNS resolvers before SRV lookup for Atlas on some Windows environments.
    if (process.platform === 'win32') {
      dns.setServers(['1.1.1.1', '8.8.8.8'])
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    throw new Error(`MongoDB connection failed: ${error.message}`)
  }
}

export default connectDB
