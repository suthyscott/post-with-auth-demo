const express = require('express')
const session = require('express-session')
const cors = require('cors')
require('dotenv').config()
const {SERVER_PORT, SESSION_SECRET} = process.env
const {auth,checkUser, deleteUser} = require('./authController')

const app = express()

app.use(express.json())
app.use(cors())

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge:1000 * 60 * 60 * 72
    }
}))

app.post('/user', auth)
app.get('/user', checkUser)
// app.delete('/user/:id', deleteUser)

app.listen(process.env.SERVER_PORT, () => console.log(`Take us to warp ${SERVER_PORT}!`))