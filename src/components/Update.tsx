//MUI 
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

//MUI Icon
import UpdateIcon from '@mui/icons-material/Update';

import { Todo, TodoContext } from '../TodoContext';

import {useState,useContext} from 'react'

type UpdateProps = {
  todo:Todo;
}

const Update:React.FC<UpdateProps> = ({todo}) => {
  const [editing,setEditing] = useState<boolean>(false);//TodoList

  const todoContext = useContext(TodoContext);
  const {updateText,setUpdateText,updateTodo} = todoContext;

  return (
    <div className='Update_Rendering' key={todo.keyF}>
      <TextField
        label = 'Update todo'
        value = {updateText}
        onChange={(e)=>setUpdateText(e.target.value)}
        // onBlur={()=>setEditingId(null)}
        sx={{
          '& .MuiInputBase-input': {
            opacity: 0.7
          }
        }}
      />
      <Button variant='contained' color='primary'onClick={() => updateTodo(todo.keyF)}>更新 &nbsp;<UpdateIcon/></Button>
    </div>
  )
}

export default Update