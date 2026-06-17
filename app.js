const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdocs = require('swagger-jsdoc')

dotenv.config()
connectDB()


const app = express()

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
                url: 'http://localhost:8080/api/v1',
                description: 'Local Server'
            },
            {
                url: 'http://your-app.onrender.com/api/v1',
                description: 'production server'
            }
        ]
    },
    apis: ['./routes/*.js', './app.js'],
}

const swaggerDocs = swaggerJsdocs(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(express.json())

app.use('/api/v1', userRoutes)
app.use('/api/v1', taskRoutes)


const PORT = process.env.PORT || 3000


app.listen(8080, () => {
    console.log(`app is listening on http://localhost:${PORT}`)
})