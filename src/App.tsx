import { useState, useEffect } from "react"
import { dbService } from "./lib/firebase"

const col = "todos"

interface Todo {
  title: string
  id?: string
}
const App = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  const B = () =>
    new Promise((ok, no) => {
      setTimeout(() => {
        console.log("b")
        ok("ok")
      }, 500)
    })

  // async () => {}
  const onAdd = async () => {
    await dbService.collection(col).add({ title: "타입스크립트 배우기" })
    console.log("추가되었습니다.")
  }

  // async await
  // try catch
  const onDelete = async (id: string) => {
    //! try 안의 코드를 실행시켜봅니다. 만약 에러가 없다면 await다음줄을 실행해줌
    try {
      if (!id) {
        return alert("Need ID!")
      }
      await dbService.collection(col).doc(id).delete()
      console.log("삭제되었습니다.")
    } catch (error: any) {
      //! try하는 부분의 코드에서 에러가 있다면 error를 받아옵니다.
      //! error 은 any로 주면 됨
      alert(error.message)
    }
  }

  const onEdit = async (updatedTodo: Todo) => {
    try {
      await dbService.collection(col).doc(updatedTodo.id).set(updatedTodo)
      console.log("수정되었습니다.")
    } catch (error: any) {
      alert(error.message)
    }
  }

  useEffect(() => {
    const subTodos = dbService.collection(col).onSnapshot((snap) => {
      const data = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      console.log("data fetched")
      setTodos(data as Todo[])
    })

    subTodos
    return subTodos
  }, [])

  return (
    <div>
      <h1>App</h1>
      <button onClick={onAdd}>ADD</button>

      <ul>
        {todos.map((todo, index) => (
          //! !는 무조건 있다 라는 뜻으로 변수 마지막에 붙이면 됨
          <li className="border" key={index} onClick={() => onEdit({ title: todo.title.concat(" 끝냄!!") })}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App

//!
