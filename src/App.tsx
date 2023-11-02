import './App.css';
import {useState,useEffect} from 'react'

//firebase,firestoreインポート
import { db } from './firebase';
import 'firebase/firestore'; // Firestore モジュールをインポート;
import { getDocs, orderBy, serverTimestamp, updateDoc } from 'firebase/firestore';
import { doc, addDoc, collection, deleteDoc ,getDoc,onSnapshot,query,getFirestore,writeBatch } from 'firebase/firestore';

// 各コンポーネント
import Title from './components/Title';
import Form from './components/Form';
import TodoList from './components/TodoList';

//typescriptでtodoの型を宣言
export type Todo = {
  keyF:string;
  todoF:string;
  timeF:string;
  editing:boolean
  completed:boolean;
}

function App() {

  const [todos,setTodos]  = useState<Todo[]>([]);
  const [text,setText]  = useState<string>('');
  const [editing,setEditing] = useState<boolean>(false);
  const [updateText,setUpdateText] = useState<string>(''); //編集テキスト用のステート
  const [editingId, setEditingId] = useState<string | null>(null);//


  //Date Time
  const today = new Date();
  const dateTime = 
  `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}`;
  // console.log(dateTime);//2023-11-1 16:59


  //useEffectを使用して初回レンダリング時にfirestoreのデータの取得・表示
  useEffect(() => {
    const todoCollection = collection(db, 'TodoApp');
  
    // onSnapshot を使用してデータベースの変更をリアルタイムで監視
    const unsubscribe = onSnapshot(query(todoCollection,orderBy('SERVERTIMESTAMP','desc')), (snapshot) => {
      const todoData = snapshot.docs.map(doc => ({
        keyF: doc.id,
        todoF: doc.data().TODO,
        timeF: doc.data().Time,
        editing: doc.data().editing, 
        completed : doc.data().completed
      }));
      setTodos(todoData);
    });
  
    // useEffect のクリーンアップ関数を使用して、監視を停止
    return () => unsubscribe();
  
  }, []);

  
  // addTodo Todoリストの追加
  const addTodo = async(text:string) => {
  try{
    const todoRef = collection(db,'TodoApp');
    await addDoc(todoRef,{
      TODO:text,
      Time:dateTime,
      SERVERTIMESTAMP:serverTimestamp(),
      editing:false,
      completed:false,
    })

    // setText('')=>Formコンポーネントで実装
    alert('Todoリストが追加されました!!')
  }catch(error){
    alert(error.message)
  }
}


  //Update　編集・上書き
  const Update = async(keyF:string) => {
    try {
      const todoDocRef = doc(db,'TodoApp',keyF)
      await updateDoc(todoDocRef,{
        TODO:updateText
      });
      alert('指定のTodoが更新されました。')
      setUpdateText('')
      setEditingId(null)
    }catch(error){
      alert('更新に失敗しました。')
    }
  }


  // Delete　削除
  const Delete = async(KeyF:string) => {
    try{
      const todoDocRef = doc(db,'TodoApp',KeyF);
      await deleteDoc(todoDocRef);
      alert('指定のリストが削除されました。')
    }catch(error){
      alert('指定のTodoリストの削除に失敗しました。')
    }
  }


  // DeleteAll　すべてのTodoリストを削除
  const DeleteAll = async () => {
    try {
      const todoCollection = collection(db, 'TodoApp');
      const todosSnapshot = await getDocs(todoCollection);
      const batch = writeBatch(db);
  
      todosSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
  
      await batch.commit();
      alert('すべてのTodoリストが削除されました。');
    } catch (error) {
      alert('Todoリストの削除に失敗しました。');
    }
  }
  

  return (
    <div>
      {/* //Text components */}
      <Title/>
      {/* Form components */}
      <Form add = {addTodo} deleteAll = {DeleteAll}/>
      {/* TodoList components */}
      <TodoList 
        todos = {todos}
        editingId = {editingId}
        setEditingId={setEditingId}
        updateText={updateText}
        setUpdateText={setUpdateText}
        updateTodo={Update}
        deleteTodo={Delete}
      />
    </div>
  );
}
// &nbsp;改行を防ぐ　no break space
export default App;
