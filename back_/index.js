require('dotenv').config()

const express = require('express')

const { connect } = require('mongoose')

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const boardsRoutes = require('./routes/boards')
const tasksRoutes = require('./routes/tasks')
const tagsRoutes = require('./routes/tags')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()}\nPATH: ${req.path}\nMETHOD: ${req.method}\n`)

  next()
})

app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/boards', boardsRoutes)
app.use('/tasks', tasksRoutes)
app.use('/tags', tagsRoutes)

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