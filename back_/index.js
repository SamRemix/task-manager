// dotenv loads environment variables from a .env file into the process.env object
require('dotenv').config()

const express = require('express')

// Mongoose is an 'Object Data Modeling' library that allows us to use methods to read and write database documents
// it also gives a way to declare schemas to ensure a strict data structure
const mongoose = require('mongoose')

// const boardsRoutes = require('./routes/boards')
const tasksRoutes = require('./routes/tasks')
const userRoutes = require('./routes/user')

const app = express()

// middleware
// Code that executes between getting a request on the server & sending a response
app.use(express.json())

app.use((req, res, next) => {
  // Every time I get a request I can log the path & the method in the console
  console.log(req.path, req.method)

  // Run the next() function to move on to next piece of middleware
  next()
})

// app.use('/api/boards', boardsRoutes)
app.use('/api/tasks', tasksRoutes)
app.use('/api/user', userRoutes)

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