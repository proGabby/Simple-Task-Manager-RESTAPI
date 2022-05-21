const mongoose = require('mongoose')


//setting a schema... which is use to set a structure for the documents of the database
//the schema is use to set a model
const TaskSchema =  new mongoose.Schema({
    //Note: only properties set in the schema will be passed to the db
    name: {
        //implement basic validation
        type: String,
        required: [true, 'field must be provided'],
        trim: true, //to ensure no whitespace
        maxlength: [20, 'field cant exceed 20 characters']
    },
    completed: {
        //implement basic validation
        type: Boolean,
    default: false}
})

//export the model
module.exports = mongoose.model('Task', TaskSchema)

 