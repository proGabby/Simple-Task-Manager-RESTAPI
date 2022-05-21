const { findOneAndUpdate } = require('../models/task_model')
const Task = require('../models/task_model')
const asyncwrapper = require('../middlewares/asyncwrapper')
const {createCustomError} = require('../errors/custom-error')

const getAllTasks= asyncwrapper(async(req,res)=>{
 
        const tasks = await Task.find({})
        res.status(200).json({tasks: tasks})
       // res.status(200).json({ztatus: "success", data: {tasks: tasks, nbHits: tasks.length}}) ... alt way of setting the api

})

const getTask= asyncwrapper(async(req,res,next)=>{
   
        const {id:taskId} = req.params
        const foundTask = await Task.findOne({_id: taskId})

        //handle instance when task is not found
        if(!foundTask){
            // const error = new Error(`task with id : ${taskId} not found`)
            // error.status = 404;
            return next(createCustomError(`task with id : ${taskId} not found`, 404))
           // return res.status(404).json({msg: `task with id : ${taskId} not found`})
        }

        res.status(200).json({task: foundTask})
    
})

const createTask= asyncwrapper(async (req,res)=>{
 
        const task = await Task.create(req.body)
        res.status(201).json({task})
    
})

const updateTask= asyncwrapper(async(req,res)=>{
        const {id:taskId} = req.params
        const findAndUpdate = await Task.findOneAndUpdate({_id: taskId}, req.body, 
            //option parameter
            {runValidators: true,
                new: true //will ensure the updated data is returned
            }
            )
     //handle instance when task is not found
        if(!findAndUpdate){
            return next(createCustomError(`task with id : ${taskId} not found`, 404))
           // return res.status(404).json({msg: `task with id : ${taskId} not found`})
        }
        res.status(200).json({task: findAndUpdate})

   
})

const deleteTask= asyncwrapper(async(req,res)=>{
        const {id:taskId} = req.params
        const foundAndDeleteTask = await Task.findOneAndDelete({_id: taskId})
         
        //handle instance when task is not found
        if(!foundAndDeleteTask){
            return next(createCustomError(`task with id : ${taskId} not found`, 404))
            //return res.status(404).json({msg: `task with id : ${taskId} not found`})
        }

        // res.status(200).json({task: foundAndDeleteTask}) ... this can be use
        res.status(200).json({task: null, status: "successful"})
        //res.status(500).json({msg: error})
    
    
})

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}