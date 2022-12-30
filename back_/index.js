require('dotenv').config()

const express = require('express')
// const session = require('express-session')
// const cors = require('cors')

const { connect } = require('mongoose')

const boardRoutes = require('./routes/board')
const taskRoutes = require('./routes/task')
const userRoutes = require('./routes/user')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()}\nPATH: ${req.path}\nMETHOD: ${req.method}\n`)

  // Run the next() function to move on to next piece of middleware
  next()
})

app.use('/boards', boardRoutes)
app.use('/tasks', taskRoutes)
app.use('/user', userRoutes)

connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database')

    app.listen(process.env.PORT, () => {
      console.log('Listening for requests on port', process.env.PORT)
    })
  })
  .catch(error => {
    console.error(error)
  })