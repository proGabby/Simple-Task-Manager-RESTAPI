const express = require('express')
const app = express()
const path = require('path')
const connectDb = require('./src/db/connect')
require('dotenv').config()  //to config/use the .env files
const notFound = require('./src/middlewares/notfound')
const errorHandlerMiddleware = require('./src/middlewares/error_handler')


const routes = require(path.join(__dirname,'src/routes/task_route.js'))


const port = process.env.PORT || 3000

// middlewares 
app.use(express.json())
// app.use(express.static("./public"))  ...to use static files

//using the route middleware
app.use('/api/v1/tasks',routes)

//handle pages not found
app.use(notFound)
app.use(errorHandlerMiddleware)  // middleware to handle error




const start = async ()=>{
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`server running at port ${port}`)
        })
 
    } catch (error) {
        console.log(error)
    }
}

start()


