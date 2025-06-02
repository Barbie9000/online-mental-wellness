import mongoose from 'mongoose'
import { setupAdmin } from '../utils/auth'
const uri = useRuntimeConfig().MONGODB_URI

if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable')
}

// Initialize global connection cache
globalThis._mongooseConn = globalThis._mongooseConn || {
    conn: null,
    promise: null,
    eventsRegistered: false
}

export async function connectDB() {
    // If already connected, return the connection
    if (globalThis._mongooseConn.conn && mongoose.connection.readyState === 1) {
        console.log('MongoDB is already connected')
        return globalThis._mongooseConn.conn
    }

    // If connection attempt is in progress, wait for it
    if (!globalThis._mongooseConn.promise) {
        console.log('Creating new MongoDB connection')
        globalThis._mongooseConn.promise = mongoose.connect(uri, {
            connectTimeoutMS: 60 * 1000,
            socketTimeoutMS: 45000,
            serverSelectionTimeoutMS: 30000,
        })
    }

    try {
        // Await the connection
        globalThis._mongooseConn.conn = await globalThis._mongooseConn.promise

        // Register connection events only once
        if (!globalThis._mongooseConn.eventsRegistered) {
            mongoose.connection.on('error', (error) => {
                console.error('MongoDB connection error:', error)
            })

            mongoose.connection.on('disconnected', () => {
                console.log('MongoDB disconnected')
                // Don't null the connection here as mongoose will try to reconnect
            })

            mongoose.connection.on('reconnected', () => {
                console.log('MongoDB reconnected')
            })

            globalThis._mongooseConn.eventsRegistered = true
        }

        console.log('MongoDB connected')
        await setupAdmin();
        return globalThis._mongooseConn.conn
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
        // Reset both promise and connection on error
        globalThis._mongooseConn.promise = null
        globalThis._mongooseConn.conn = null
        throw error
    }
}