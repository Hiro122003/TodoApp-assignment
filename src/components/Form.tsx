import {useState} from 'react'

//MUI 
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

//MUI Icon
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddBoxIcon from '@mui/icons-material/AddBox';

// typescript propsの型を宣言
type FormProps = {
  add:(text:string)=>void;
  deleteAll:() => void;
}

const Form:React.FC<FormProps> = ({add,deleteAll}) => {
  const [text,setText]  = useState<string>('');

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    add(text);
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
            <Button variant='contained' color='primary' onClick={deleteAll}>すべて削除 All &nbsp;<DeleteOutlineIcon/></Button>
        </Paper>
      </form>
  )
}

export default Form