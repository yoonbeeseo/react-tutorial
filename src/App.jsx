import PropTypes from "prop-types"
import { useState } from "react"

const App = () => {
  const [todos, setTodos] = useState(["Learn React", "Study more", "Cleaning"])

  return (
    <div>
      <h1>App</h1>
      <TodoForm todos={todos} setTodos={setTodos} />
      {todos.map((todo, index) => {
        return <TodoItem key={todo} index={index} todo={todo} setTodos={setTodos} todos={todos} />
      })}
    </div>
  )
}

export default App

const TodoItem = ({ todo, index, setTodos, todos }) => {
  const onDelete = () => {
    setTodos((prev) => prev.filter((item) => item !== todo))
    alert("삭제되었습니다.")
  }
  return (
    <>
      <div style={{ display: "flex", columnGap: 10 }}>
        <p>
          {index + 1}. {todo}
        </p>
        <button onClick={onDelete}>삭제</button>
      </div>
      <TodoForm setTodos={setTodos} todos={todos} isUpdate payload={todo} />
    </>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.string,
  index: PropTypes.number,
  setTodos: PropTypes.func,
  todos: PropTypes.arrayOf(PropTypes.string),
}

const TodoForm = ({ todos, setTodos, isUpdate, payload }) => {
  const [input, setInput] = useState(payload ?? "")

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (input.length === 0) {
          return alert("type todos")
        }
        const foundIndex = todos.findIndex((item) => {
          if (!isUpdate) {
            return item === input && item
          }
          return item === payload && item
        })
        console.log(foundIndex)
        if (foundIndex >= 0) {
          if (!isUpdate) {
            return alert("Already Added!")
          }
        }
        if (isUpdate && foundIndex < 0) {
          return alert("No Such Item")
        }
        setTodos((prev) => {
          let copy = [...prev]

          if (!isUpdate) {
            copy.unshift(input)
          } else {
            copy[foundIndex] = input
          }

          return copy
        })

        alert(isUpdate ? "수정되었습니다." : "추가되었습니다.")
      }}
    >
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button>{isUpdate ? "수정" : "추가"}</button>
    </form>
  )
}

TodoForm.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.string),
  setTodos: PropTypes.func,
  isUpdate: PropTypes.bool,
  payload: PropTypes.string,
}
