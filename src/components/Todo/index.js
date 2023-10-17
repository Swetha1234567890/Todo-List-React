import {useState} from 'react'
import './index.css'

function Todo({todo, onToggle, onDelete, onEdit}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(todo.title)

  const handleEditSave = () => {
    onEdit(todo.id, editedTitle)
    setIsEditing(false)
  }

  return (
    <div>
      {isEditing ? (
        <div className="save-container">
          <input
            className="save-text"
            type="text"
            value={editedTitle}
            onChange={e => setEditedTitle(e.target.value)}
          />
          <button className="save-btn" type="button" onClick={handleEditSave}>
            Save
          </button>
        </div>
      ) : (
        <div className="list-container">
          <div>
            <input
              className="check-box"
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
            />
            <span
              className="text"
              style={{textDecoration: todo.completed ? 'line-through' : 'none'}}
            >
              {todo.title}
            </span>
          </div>
          <div>
            <button
              className="edit-btn"
              type="button"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="del-btn"
              type="button"
              onClick={() => onDelete(todo.id)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Todo
