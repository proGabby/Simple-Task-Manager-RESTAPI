const mongoose = require('mongoose')



const connectDB = (urlString)=>{
   //connect to mongodb asynchronously
   return mongoose.connect(urlString).then(()=>{
        console.log('db connected')
    })
}


module.exports = connectDB