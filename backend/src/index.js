const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const NoteApi = require('./api/note')
const UserApi = require('./api/user')
const app = express()
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/MyNote')

app.use(cors())
app.use('/api',NoteApi)
app.use('/users',UserApi)
app.listen(3001 ,()=>{
    console.log('Server Running on port 3001')
})