import TodoListItem from './TodoListItem';
import Update from './Update';

//MUI
import Paper from '@mui/material/Paper';

// typescriptのtodoの型
import { Todo } from '../App';


type TodoListProps = {
  todos:Todo[];
  editingId: string|null;
  setEditingId:(keyF: string | null)=>void;
  updateText: string;
  setUpdateText: (text: string) => void;
  updateTodo: (keyF: string) => void;
  deleteTodo: (keyF: string) => void;
}

const TodoList = ({
  todos,
  editingId,
  setEditingId,
  updateText,
  setUpdateText,
  updateTodo,//Update関数
  deleteTodo//Delete
}) => {
  return (
    <div>
      {todos.map((todo:Todo,i:number)=>(
        <Paper elevation={5}  key={i}>
          {editingId === todo.keyF ? (
            <Update
              key={todo.keyF}
              todo = {todo}
              updateText={updateText}
              setUpdateText={setUpdateText}
              onUpdate={() => updateTodo(todo.keyF)}
            />
          ):(
            <TodoListItem 
              index = {i}
              key={todo.keyF}
              todo={todo}
              onEdit={() => {
                setEditingId(todo.keyF);
                setUpdateText(todo.todoF);
              }}
              onDelete={() => deleteTodo(todo.keyF)}
            />
          )}
        </Paper>
      ))}
    </div>
  )
}

export default TodoList