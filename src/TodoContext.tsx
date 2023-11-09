import {useState,useEffect,useContext} from 'react'
import { createContext } from 'react';

import { db } from './firebase';
import 'firebase/firestore'; // Firestore モジュールをインポート;
import { Timestamp, getDocs, orderBy, serverTimestamp, updateDoc } from 'firebase/firestore';
import { doc, addDoc, collection, deleteDoc ,getDoc,onSnapshot,query,getFirestore,writeBatch } from 'firebase/firestore';

export type Todo = {
  keyF:string;
  todoF:string;
  timeF:string;
  editing:boolean
  completed:boolean;
  deadline:Date|null;
}

type TodoContextProps = {
  todos:Todo[];
  addTodo:(text:string)=>void;
  updateTodo:(keyF:string)=>void;
  deleteTodo:(keyF:string)=>void;
  deleteAlltodo:()=>void;
  editingId:string|null,
  setEditingId:(keyF:string)=>void;
  updateText:string;
  setUpdateText:(text:string)=>void
  deadline:Date|null;
  setDeadline:(date:Date)=>void
  updateTodoDeadline:(keyF:string,newDeadline:Timestamp)=>void;
  completedTodo:(keyF:string)=>void
  completed:boolean;
}

export const TodoContext = createContext<TodoContextProps|null>(null);

export const TodoProvider = ({children}) => {
  // useState
  const [todos,setTodos]  = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null)
  const [updateText,setUpdateText] = useState<string>(''); //update
  const [deadline,setDeadline] = useState<Date|null>(null);
  const [completed,setCompleted] = useState<boolean>(false)
  
 ;//TodoList


  //useEffectを使用して初回レンダリング時にfirestoreのデータの取得・表示
  useEffect(() => {
    const todoCollection = collection(db, 'TodoApp');

  // -------------------------------------------------------------
    // 注onSnapshot を使用してデータベースの変更をリアルタイムで監視
    // // 最初の引数 (クエリオブジェクト): この引数は、Firestore データベースのどのデータを監視するかを指定するクエリオブジェクトです。
    // 2番目の引数 (コールバック関数): この引数は、指定されたクエリの結果に対してデータが変更されたときに呼び出されるコールバック関数です。この関数は QuerySnapshot オブジェクトを受け取り、その中にはクエリの結果として得られたドキュメントのセットが含まれています。
    // --------------------------------------------------
    const unsubscribe = onSnapshot(query(todoCollection,orderBy('SERVERTIMESTAMP','desc')), (snapshot) => {
      const todoData = snapshot.docs.map(doc => ({
        keyF: doc.id,
        todoF: doc.data().TODO,
        timeF: doc.data().Time,
        editing: doc.data().editing, 
        completed : doc.data().completed,
        deadline:doc.data().deadline
      }));
      setTodos(todoData);
    });
  
    // useEffect のクリーンアップ関数を使用して、監視を停止
    return () => unsubscribe();
  
  }, []);

    //Date Time
    const today = new Date();
    const dateTime = 
    `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}`;
    // console.log(dateTime);//2023-11-1 16:59


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
        deadline:deadline
      })
  
      // setText('')=>Formコンポーネントで実装
      // alert('Todoリストが追加されました!!')
    }catch(error){
      alert(error.message)
    }
  }
  
  
    //Update　編集・上書き
    const updateTodo = async(keyF:string) => {
      try {
        const todoDocRef = doc(db,'TodoApp',keyF)
        await updateDoc(todoDocRef,{
          TODO:updateText
        });
        // alert('指定のTodoが更新されました。')
        setUpdateText('')
        setEditingId(null)
      }catch(error){
        alert('更新に失敗しました。')
      }
    }
  
  
    // Delete　削除
    const deleteTodo = async(KeyF:string) => {
      const confirmDelete = window.confirm('本当に削除しますか？');
      if(confirmDelete){
        try{
          const todoDocRef = doc(db,'TodoApp',KeyF);
          await deleteDoc(todoDocRef);
          // alert('指定のリストが削除されました。')
        }catch(error){
          alert('指定のTodoリストの削除に失敗しました。')
        }
      }
      else return 
    }
  
  
    // DeleteAll　すべてのTodoリストを削除
    const deleteAlltodo = async () => {
      const confirmAllDelete = window.confirm('本当にすべて削除しますか？');
      if(confirmAllDelete){
        try {
          const todoCollection = collection(db, 'TodoApp');
          const todosSnapshot = await getDocs(todoCollection);
          const batch = writeBatch(db);
      
          todosSnapshot.forEach((doc) => {
            batch.delete(doc.ref);
          });
      
          await batch.commit();
          // alert('すべてのTodoリストが削除されました。');
        } catch (error) {
          alert('Todoリストの削除に失敗しました。');
        }
      }
      else return
    }

    const updateTodoDeadline = async(
      keyF:string,
      newDeadline:Timestamp) => {
        const deadLineRef = doc(db,'TodoApp',keyF);
        await updateDoc(deadLineRef,{
          deadline:newDeadline 
        })
    };

    const completedTodo = async(keyF:string) => {
      setCompleted(prev=>!prev)
      const completedRef = doc(db,'TodoApp',keyF);
      await updateDoc(completedRef,{
        completed:completed
      })
    }

    const value = {
      todos,
      addTodo,
      updateTodo,
      deleteTodo,
      deleteAlltodo,
      editingId,
      setEditingId,
      updateText,
      setUpdateText,
      deadline,
      setDeadline,
      updateTodoDeadline,
      completedTodo,
      completed
    };
    
    return <TodoContext.Provider value = {value}>
      {children}
    </TodoContext.Provider>
}

