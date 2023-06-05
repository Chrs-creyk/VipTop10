import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { createData } from './services/setUpDatabase'

const app = express()

app.use(express.json())

// Load the env variables
dotenv.config()

// Obtaining env variables for the connection
const PORT = process.env.PORT ?? 3500
const USER = process.env.DATABASE_USER ?? 'default'
const PASSWORD = process.env.DATABASE_PASSWORD ?? 'default'

// String connection
const connectionString = `mongodb+srv://${USER}:${PASSWORD}@top10.6oki5fv.mongodb.net/?retryWrites=true&w=majority`

// Connect to the database
mongoose.connect(connectionString)
  .then(() => {
    console.log('Connected to MongoDB Atlas')
  })
  .catch((error: Error) => {
    console.log(`Failed to connect to MongoDB ${error.message}`)
  })

// Creating the static data
createData()
  .then(_data => {
    console.log('Data created sucessfully')
  })
  .catch((err: Error) => {
    console.log('Error creating data: ' + err.message)
  })

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
