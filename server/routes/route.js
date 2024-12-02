const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const TodoSchema = require("../models/schema")

router.get('/', (req, res)=>{
    try {
      TodoSchema.find().then((data)=>{
        console.log(data);
        res.send(data)
      })
    } catch (error) {
      
    }
})

router.post('/create', async (req, res)=>{
   try {
     const newTodo = new TodoSchema({title: req.body.text})
    await newTodo.save()
    res.status(200).send("Succusfully added")
    
     console.log(req.body)
   } catch (error) {
    console.log(error);
    res.status(406).send("Succusfully added")
    
   }
})

router.put('/edit/:id' , async (req, res)=>{
  const todoId = req.params.id;
  const { editedTodo } = req.body;
  
  console.log(todoId);
  console.log("Edit", req.body)
  try {
      const updatedTodo = await TodoSchema.findByIdAndUpdate(todoId, { $set: {title: editedTodo}}, {
        new: true, 
      })
      res.send(updatedTodo)
  } catch (error) {
    console.log(error);
  }
})

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  console.log('One', id);
  try {
    const deletedTodo = await TodoSchema.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    return res.status(200).json({ success: true, msg: 'Todo Deleted' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return res.status(500).json({ error: 'Server error while deleting todo' });
  }
});



module.exports  = router