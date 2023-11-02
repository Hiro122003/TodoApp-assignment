

//MUI 
import Button from '@mui/material/Button';

//MUI Icon
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { Todo } from '../App';

type TodoListItemProps = {
  index:string | number
  todo: Todo; 
  onEdit: () => void;
  onDelete: () => void;
};

const TodoListItem = ({
  index,
  todo,
  onEdit,
  onDelete
}) => {
  return (
    <div className='Todos_Rendering'>
      <p 
        onClick={onEdit}>
        {index + 1} &nbsp;&nbsp;&nbsp;{todo.todoF}
      </p>
      <div>
        {/* Edit fucntion */}
        <Button 
        variant='contained'
        color='primary' 
        onClick={onEdit}>
          編集 &nbsp;
          <ModeEditIcon/>
        </Button>

        {/* Delete function */}
        <Button 
          variant='contained' 
          color='primary' 
          onClick={onDelete}>
            削除 &nbsp;
            <DeleteOutlineIcon/>
        </Button>
      </div>
      <span>{todo.timeF}</span>
    </div> 
  )
}

export default TodoListItem