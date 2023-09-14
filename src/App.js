import logo from './logo.svg'
import './App.css'
import { useFireproof } from 'use-fireproof'
import { fireproof, index } from '@fireproof/core'

function App() {
  const { useLiveQuery, useDocument, database } = useFireproof(fireproof('my-db'))
  const response = useLiveQuery(index(database, 'date'))
  const todos = response.docs

  const [newTodo, setNewTodo, saveNewTodo] = useDocument({date : Date.now(), text: '', completed: false})
  return (
    <div className="App">
      <input type="text" value={newTodo.text} onChange={(event)=>{setNewTodo({text:event.target.value})}}></input>
      <button onClick={() => saveNewTodo().then(setNewTodo(false))}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => database.put({ ...todo, completed: !todo.completed })}
            />
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
