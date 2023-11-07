//MUI 
import Button from '@mui/material/Button';

//MUI Icon
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { Todo, TodoContext } from '../TodoContext';
import Deadline from './Deadline';

import {useContext} from 'react'

type TodoListItemProps = {
  index:number
  todo: Todo; 
};

const TodoListItem = ({
  index,
  todo,
}:TodoListItemProps) => {

  const todoContext = useContext(TodoContext)
  const {setEditingId,setUpdateText,deleteTodo} = todoContext;

  return (
    <div className='Todos_Rendering'>
      <p 
        onClick={() => {
          setEditingId(todo.keyF);
          setUpdateText(todo.todoF);
        }}>
        {index + 1} &nbsp;&nbsp;&nbsp;{todo.todoF}
      </p>
      <div>
        {/* Edit fucntion */}
        <Button 
        variant='contained'
        color='primary' 
        onClick={() => {
          setEditingId(todo.keyF);
          setUpdateText(todo.todoF);
        }}>
          編集 &nbsp;
          <ModeEditIcon/>
        </Button>

        {/* Delete function */}
        <Button 
          variant='contained' 
          color='primary' 
          onClick={() => deleteTodo(todo.keyF)}>
            削除 &nbsp;
            <DeleteOutlineIcon/>
        </Button>
        <Deadline/>
      </div>
      <span>{todo.timeF}</span>
    </div> 
  )
}

export default TodoListItem