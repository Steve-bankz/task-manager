const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdocs = require('swagger-jsdoc')
const cors = require('cors')

dotenv.config()
connectDB()


const app = express()

app.use(cors())

app.use(express.json())

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Manager',
            version: '1.0.0',
            description: 'A simple Express Task Manager API'
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                },
            },
        },
        security: [
            {
                beareAuth: [],
            },
        ],
        servers: [
            {
                url: 'http://localhost:3000/api/v1',
                description: 'Local Server'
            },
            {
                url: 'https://task-manager-api-gme2.onrender.com/api/v1',
                description: 'production server'
            }
        ]
    },
    apis: ['./routes/*.js', './app.js'],
}

const swaggerDocs = swaggerJsdocs(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


app.use('/api/v1', userRoutes)
app.use('/api/v1', taskRoutes)


const PORT = process.env.PORT || 3000


app.listen(PORT, '0.0.0.0', () => {
    console.log(`app is listening on http://localhost:${PORT}`)
})