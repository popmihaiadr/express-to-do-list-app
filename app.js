const express = require('express')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')

const apiDoc = require('./docs/apidoc')

const {
    authRoutes,
    taskRoutes,
} = require('./src/routes')

const {
    logErrorMiddleware,
    returnErrorMiddleware,
} = require('./src/middlewares/errors')

const app = express()

app.use(bodyParser.json())

app.use(authRoutes)
app.use(taskRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDoc))

app.use(logErrorMiddleware)
app.use(returnErrorMiddleware)

module.exports = app