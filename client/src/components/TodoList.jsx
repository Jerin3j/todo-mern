import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

export const TodoList = () => {
 
  const navigate = useNavigate()
  const [todos, setTodos] = useState([])
  const [isEdit, setIsEdit] = useState()
  const [editedTodo, setEditedTodo] = useState()

  
  useEffect(() => {
    const getTodos = async () => {
      const todoDatas = await axios.get('https://todo-mern-qbio.onrender.com/')
       setTodos(todoDatas.data)
       console.log(todoDatas.data);
    }
    getTodos()
  }, [])
  

  const onEdit = async(id) => {
   setIsEdit(id)
  }

  const onDelete = async (id) => {
    await axios.delete(`https://todo-mern-qbio.onrender.com/delete/${id}`)
    .then(response =>{ 
      console.log(response)
      window.location.reload()
    })
    .catch(error => console.error(error));
   return true
  }
 
  const setTodo = async () => {
    console.log(isEdit); 
    
    await axios.put(`https://todo-mern-qbio.onrender.com/edit/${isEdit}`, {editedTodo})
    .then((response)=> {
      console.log(response);
      setIsEdit()
      
    })
  }

  return (
    <div className='h-full'>
      <div>
  { todos.map((data, id)=> (
      <div id={id} class="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg border border-gray-200 relative mt-3">
    <div class="flex items-center justify-between space-x-4">
    <div class="flex-shrink-0 text-gray-700 font-medium text-sm">
      #{id+1}
    </div>

    <div class="flex-grow text-gray-800 font-semibold text-base truncate">
      {data.title}
    </div>

    <div class="flex space-x-2">
      <button
        onClick={()=> onEdit(data._id)}
        class="px-3 py-1 text-sm text-blue-600 bg-blue-100 hover:bg-blue-200 rounded-full font-medium"
      >
        Edit
      </button>

      <button
       onClick={()=> onDelete(data._id)}
        class="px-3 py-1 text-sm text-red-600 bg-red-100 hover:bg-red-200 rounded-full font-medium"
      >
        Delete
      </button>
    </div>
  </div>
</div>
  ))}
  </div>
   {isEdit && (
    <div className="edit-todo mt-4">
    <div className="input  w-full h-14 px-4">
      <form className='flex flex-col gap-2'>
       <textarea onChange={(e)=> setEditedTodo(e.target.value)} name='text' type="text" placeholder='Write the todo' className="border h-32" />
         <button onClick={setTodo} type='submit' className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
          Edit
        </button>
      </form>
    </div>
  </div>
   )}
    </div>
  )
}
