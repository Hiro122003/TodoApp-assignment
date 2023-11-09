//MUI 
import Button from '@mui/material/Button';

//MUI Icon
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DoneIcon from '@mui/icons-material/Done';

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
  const {setEditingId,setUpdateText,deleteTodo,completedTodo} = todoContext;

  return (
    <div className='Todos_Rendering'>
      <div className='Todos_textWithDate'>
        <p 
          onClick={() => {
            setEditingId(todo.keyF);
            setUpdateText(todo.todoF);
          }}
          // className={todo.completed ? 'completed':''} 二重線
        >
          {index + 1} &nbsp;&nbsp;&nbsp;{todo.todoF}
        </p>
        <span>{`${todo.timeF} 作成`}</span>
      </div>
      
      <div>
        {/* Edit fucntion */}
        <Button 
        variant='contained'
        color='primary' 
        onClick={() => {
          setEditingId(todo.keyF);
          setUpdateText(todo.todoF);
        }}
        disabled = {todo.completed}
        >
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
        <Button
          variant='contained'
          color='primary'
          onClick={()=>completedTodo(todo.keyF) }
        >
          {todo.completed ? '未完了に戻す':
          '完了'} &nbsp;
          {todo.completed ? '':<DoneIcon/>}
        </Button>

        {/* deadlineのカレンダー */}
        {todo.completed ? '':<Deadline todo={todo}/>}
        
      </div>
      
    </div> 
  )
}

export default TodoListItem