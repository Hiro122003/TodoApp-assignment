import TodoListItem from './TodoListItem';
import Update from './Update';

//MUI
import Paper from '@mui/material/Paper';

// typescriptのtodoの型
import { Todo } from '../TodoContext';

import {useContext,useState} from 'react'
import { TodoContext } from '../TodoContext';

const TodoList = () => {
  const todoContext = useContext(TodoContext);
  const {todos,editingId} = todoContext;


  
  return (
    <div>
      {todos.map((todo:Todo,i:number)=>(
        <Paper elevation={5}  key={i}>
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