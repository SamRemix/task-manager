// dotenv loads environment variables from a .env file into the process.env object
require('dotenv').config()

const express = require('express')
// const cors = require('cors')

// Mongoose is an 'Object Data Modeling' library that allows us to use methods to read and write database documents
// it also gives a way to declare schemas to ensure a strict data structure
const mongoose = require('mongoose')

const boardRoutes = require('./routes/board')
const taskRoutes = require('./routes/task')
const userRoutes = require('./routes/user')

const app = express()
// app.use(cors({ origin: true }))

// middleware
// Code that executes between getting a request on the server & sending a response
app.use(express.json())

app.use((req, res, next) => {
  // Every time I get a request I can log the path & the method in the console
  console.log(`${new Date().toLocaleTimeString()}\nPATH: ${req.path}\nMETHOD: ${req.method}\n`)

  // Run the next() function to move on to next piece of middleware
  next()
})

app.use('/boards', boardRoutes)
app.use('/tasks', taskRoutes)
app.use('/user', userRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database')

    app.listen(process.env.PORT, () => {
      console.log('Listening for requests on port', process.env.PORT)
    })
  })
  .catch(error => {
    console.error(error)
  })