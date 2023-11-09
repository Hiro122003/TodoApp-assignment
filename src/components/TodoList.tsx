import TodoListItem from './TodoListItem';
import Update from './Update';

//MUI
import Paper from '@mui/material/Paper';

// typescriptのtodoの型
import { Todo } from '../TodoContext';

import {useContext,useState} from 'react'
import { TodoContext } from '../TodoContext';
import { Button } from '@mui/material';
import { fileURLToPath } from 'url';


const TodoList = () => {
  const todoContext = useContext(TodoContext);
  const {todos,editingId} = todoContext;

  const [showCompleted,setShowCompleted] = useState<boolean>(false)

  const handleChange = () => setShowCompleted(prev=>!prev)
  
  const filteredTodos = showCompleted ? todos.filter(todo=>!todo.completed):todos;

  return (
    <div>
      <Button
        variant='contained'
        color = 'error'
        onClick={handleChange}
        disabled = {todos.length===0}
        style={{marginBottom:'10px'}}
      >
        {showCompleted ? 'すべてのタスクを表示する': todos.length===0 ? 'タスクはありません':'未完了のタスクを表示'}
      </Button>
      {filteredTodos.map((todo:Todo,i:number)=>(
        <Paper 
          elevation={5}  
          key={i}
          sx={{ backgroundColor: todo.completed ? 'rgb(126, 119, 119)' : '' }}
        >
          {editingId === todo.keyF ? (
            <Update
              key={todo.keyF}
              todo = {todo}
            />
          ):(
            <TodoListItem 
              index = {i}
              key={todo.keyF}
              todo={todo}
            />
          )}
        </Paper>
      ))}
    </div>
  )
}

export default TodoList