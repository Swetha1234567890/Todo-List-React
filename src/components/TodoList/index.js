import {useState, useEffect} from 'react'
import Todo from '../Todo'
import './index.css'

function TodoList() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    // Fetch initial todos from the API
    fetch('https://jsonplaceholder.typicode.com/users/1/todos')
      .then(response => response.json())
      .then(data => {
        setTodos(data)
      })
  }, [])

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          title: newTask,
          completed: false,
        },
      ])
      setNewTask('')
    }
  }

  const toggleTask = id => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? {...todo, completed: !todo.completed} : todo,
      ),
    )
  }

  const editTask = (id, newTitle) => {
    setTodos(
      todos.map(todo => (todo.id === id ? {...todo, title: newTitle} : todo)),
    )
  }

  const deleteTask = id => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div>
      <input
        className="input-task"
        type="text"
        placeholder="New task"
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
      />
      <button className="add-btn" onClick={addTask} type="button">
        Add Task
      </button>
      <div>
        <button
          className="type-btn1"
          type="button"
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className="type-btn2"
          type="button"
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>
      {todos
        .filter(todo => (filter === 'completed' ? todo.completed : true))
        .map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        ))}
    </div>
  )
}

export default TodoList
