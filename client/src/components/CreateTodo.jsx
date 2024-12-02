import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const CreateTodo = () => {

  const navigate = useNavigate()
  const [text, setText] = useState('')
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
          console.log(text)
         await axios.post('http://localhost:3001/create', {text})
          navigate('/')
        } catch (error) {
          console.log(error)
        }        
    }
  return (
    <section>
        <div className="create-todo">
          <div className="input  w-full h-14 px-4">
            <form className='flex flex-col gap-2' onSubmit={onSubmit}>
             <textarea onChange={(e)=> setText(e.target.value)} name='text' type="text" placeholder='Write the todo' className="border h-32" />
               <button type='submit' className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
                Create
              </button>
            </form>
          </div>
        </div>
    </section>
  )
}
