const { findOneAndUpdate } = require('../models/task_model')
const Task = require('../models/task_model')

const getAllTasks= async(req,res)=>{
    try {
        const tasks = await Task.find({})
        res.status(200).json({tasks: tasks})
       // res.status(200).json({ztatus: "success", data: {tasks: tasks, nbHits: tasks.length}}) ... alt way of setting the api

    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const getTask=async(req,res)=>{
    try {
        const {id:taskId} = req.params
        const foundTask = await Task.findOne({_id: taskId})

        //handle instance when task is not found
        if(!foundTask){
            return res.status(404).json({msg: `task with id : ${taskId} not found`})
        }

        res.status(200).json({task: foundTask})
    } catch (error) {
        res.status(500).json({msg: error})  
    }
}

const createTask= async (req,res)=>{
    try { 
        const task = await Task.create(req.body)
        res.status(201).json({task})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const updateTask= async(req,res)=>{
    try {
        const {id:taskId} = req.params
        const findAndUpdate = await Task.findOneAndUpdate({_id: taskId}, req.body, 
            //option parameter
            {runValidators: true,
                new: true //will ensure the updated data is returned
            }
            )
     //handle instance when task is not found
        if(!findAndUpdate){
            return res.status(404).json({msg: `task with id : ${taskId} not found`})
        }
        res.status(200).json({task: findAndUpdate})

    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const deleteTask= async(req,res)=>{
    try {
        const {id:taskId} = req.params
        const foundAndDeleteTask = await Task.findOneAndDelete({_id: taskId})
         
        //handle instance when task is not found
        if(!foundAndDeleteTask){
            return res.status(404).json({msg: `task with id : ${taskId} not found`})
        }

        // res.status(200).json({task: foundAndDeleteTask}) ... this can be use
        res.status(200).json({task: null, status: "successful"})
    } catch (error) {
        res.status(500).json({msg: error})
    }
    
}

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}