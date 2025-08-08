const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes')

dotenv.config()
connectDB()


const app = express()

app.use(express.json())

app.use('/api/v1', userRoutes)
app.use('/api/v1', taskRoutes)


const PORT = process.env.PORT || 3000


app.listen(8080, () => {
    console.log(`app is listening on http://localhost:${PORT}`)
})