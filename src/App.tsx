import './App.css';

//firebase,firestoreインポート
import 'firebase/firestore'; // Firestore モジュールをインポート;

// 各コンポーネント
import Title from './components/Title';
import Form from './components/Form';
import TodoList from './components/TodoList';
import { TodoProvider } from './TodoContext';

function App() {

  return (
    <TodoProvider>
      <div className='example'>
        <Title/>
        <Form/>
        <TodoList />
      </div>
    </TodoProvider>
    
  );
}
// &nbsp;改行を防ぐ　no break space
export default App;
