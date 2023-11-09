import {useState,useContext} from 'react'

//MUI 
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

//MUI Icon
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { TodoContext } from '../TodoContext';

// typescript propsの型を宣言
type FormProps = {
  add:(text:string)=>void;
  deleteAll:() => void;
}

const Form = () => {
  const [text,setText]  = useState<string>('');

  const todoContext = useContext(TodoContext);
  const {addTodo,deleteAlltodo,todos} = todoContext;

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(text);
    setText('')
  }

  return (
    <form onSubmit={handleSubmit}>
        <Paper elevation={5} className='Add_Todo'>
          <TextField
              className='Text_Field'
              label='Todoを入力'
              value={text}
              onChange={(e) => setText(e.target.value)}
              inputProps={{ maxLength: 55 }} // maxLength 最大文字数を設定
            />
            <br/><br/>
            {/* Add function  */}
            <Button type = 'submit' variant='contained' color='primary'  disabled={!text}>追加 &nbsp;<AddBoxIcon/></Button>
            {/* Delete All fucntion */}
            <Button variant='contained' color='primary' onClick={deleteAlltodo} disabled={todos.length===0}>すべて削除 &nbsp;<DeleteOutlineIcon/></Button>
        </Paper>
      </form>
  )
}

export default Form