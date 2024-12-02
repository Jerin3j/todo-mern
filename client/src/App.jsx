import './App.css';
import { CreateTodo } from './components/CreateTodo';
import { TodoList } from './components/TodoList';
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router> 
    <div className="App">
    <div className="w-full h-full flex flex-col gap-4 items-center">
      <div className="flex items-center justify-between bg-slate-600 w-full h-14 px-4">
        <h1 className="text-blue-400 text-3xl font-bold">My Todos</h1>
        <Link to={'/create'}>      
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
            Create
          </button>
        </Link>
      </div>
  
      <div className="created-todos flex flex-col justify-center mt-5 w-full max-w-3xl">
       <Routes>   
        <Route path='/' element={<TodoList />}/>
        <Route path='/create' element={<CreateTodo />}/>
       </Routes>

      </div>
    </div>
  </div>
  </Router>
  );
}

export default App;
