

//MUI 
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

//MUI Icon
import UpdateIcon from '@mui/icons-material/Update';

import { Todo } from '../App';

type UpdateProps = {
  todo:Todo;
  updateText:string;
  setUpdateText:(text:string)=>void;
  onUpdate:()=>void
}

const Update:React.FC<UpdateProps> = ({
  todo,
  updateText,
  setUpdateText,
  onUpdate
}) => {
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
      <Button variant='contained' color='primary'onClick={onUpdate}>更新 &nbsp;<UpdateIcon/></Button>
    </div>
  )
}

export default Update