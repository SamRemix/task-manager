require('dotenv').config()

const express = require('express')
// const session = require('express-session')
// const cors = require('cors')

const { connect } = require('mongoose')

const boardsRoutes = require('./routes/boards')
const tasksRoutes = require('./routes/tasks')
const userRoutes = require('./routes/user')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()}\nPATH: ${req.path}\nMETHOD: ${req.method}\n`)

  next()
})

app.use('/boards', boardsRoutes)
app.use('/tasks', tasksRoutes)
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