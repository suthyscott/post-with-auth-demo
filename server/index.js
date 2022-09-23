const express = require('express')
const cors = require('cors')
require('dotenv').config()
const {SERVER_PORT} = process.env
const {auth, deleteUser} = require('./authController')

const app = express()

app.use(express.json())
app.use(cors())

app.post('/user', auth)
// app.delete('/user/:id', deleteUser)

app.listen(process.env.SERVER_PORT, () => console.log(`Take us to warp ${SERVER_PORT}!`))