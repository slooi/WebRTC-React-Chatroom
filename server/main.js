const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const myApp = require('./app.js')

// ENVIRONMENT VARIABLES / CONSTANTS
const PORT = process.env.PORT || 8443 

// Middleware
app.use(express.static(path.resolve('..','client','dist')))

// Setup routes
app.get('/',(req,res)=>{
    console.log('someone is tring to connect')
    res.sendFile(path.resolve('..','client','dist','index.html'))
})


// server
const server = http.createServer(app)
server.listen(PORT,()=>{console.log('Listening on port '+PORT)})


// Setup actual application
myApp(server)