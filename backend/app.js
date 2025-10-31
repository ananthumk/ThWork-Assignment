const express = require('express')
const app = express()

const cors = require('cors')
const { default: mongoose } = require('mongoose')
const router = require('./routes/TaskRoutes')

require('dotenv').config()

app.use(cors())
app.use(express.json())

const connectDb = async () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true, useUnifiedTopology: true
})
console.log('Mongodb connected: ')
  } catch (error) {
    console.log('error at connecting mongo db: ', error.message)
    process.exit(1)
  }
}

connectDb()
app.use('/', router)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server runing at http://localhost:${PORT}`)
})