import {useContext, useState} from 'react'
import { Timestamp} from 'firebase/firestore';

// DatePickerのimport
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TodoContext,Todo } from '../TodoContext';

type DeadlineProps = {
  todo:Todo
}

const Deadline = ({todo}:DeadlineProps) => {
  // const [deadline,setDeadline] = useState<Date|null>(null)
  const todoContext = useContext(TodoContext);
  const {deadline,setDeadline,updateTodoDeadline} = todoContext;

  const handleChange = (date: Date | null) => {
    if (date) {
      // Convert the date to a Firestore Timestamp before passing
      const timestamp = Timestamp.fromDate(date);
      updateTodoDeadline(todo.keyF, timestamp);
    } else {
      alert('日付が無効です');
    }
  };
  

  const isPastDeadline = (date: Date | null) => {
    if (!date) {
      return false;
    }

    const today = new Date();
    const selectedDate = new Date(date);
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    return selectedDate < today;
  };

  return (
    <div className='datePicker'>
      {todo.deadline && isPastDeadline(todo.deadline instanceof Timestamp ? todo.deadline.toDate() : todo.deadline) ? (
        <p style={{ color: 'red', fontWeight: 'bold' }}>期限が過ぎています！！</p>
         ) : (
        <p>期限</p>
        )}
      <DatePicker 
        selected={todo.deadline instanceof Timestamp ? todo.deadline.toDate() : todo.deadline}
        onChange={handleChange}
        placeholderText='期限を選択してください'
        className={todo.deadline && isPastDeadline(todo.deadline instanceof Timestamp? todo.deadline.toDate():todo.deadline ) ? 'past-deadline':''}
      />
      {/* {deadline && isPastDeadline(deadline) && (
        <div className="alert">期限が過ぎています！</div>
      )} */}
    </div>
  )
}

export default Deadline