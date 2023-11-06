import {useState} from 'react'

// DatePickerのimport
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const Deadline = () => {
  const [deadline,setDeadline] = useState<Date|null>(null)

  const handleChange = (date:Date|null) => {
    setDeadline(date);
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
      {deadline && isPastDeadline(deadline) ? (
        <p style={{ color: 'red', fontWeight: 'bold' }}>期限が過ぎていま  す！！</p>
         ) : (
        <p>期限</p>
        )}
      <DatePicker 
        selected={deadline}
        onChange={handleChange}
        placeholderText='期限を選択してください'
        className={deadline && isPastDeadline(deadline) ? 'past-deadline':''}
      />
      {/* {deadline && isPastDeadline(deadline) && (
        <div className="alert">期限が過ぎています！</div>
      )} */}
    </div>
  )
}

export default Deadline