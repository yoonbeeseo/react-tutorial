import { useState, useEffect } from "react";
import { dbService } from "../../lib";
import CRUDForm from "./CRUDForm";
import CRUDItem from "./CRUDItem";

export interface Todo {
  text: string;
  id: string;
  isDone: boolean;
}
//Todo: Container 만들기, 데이터 실시간으로 받아오기
//Todo Form, Item
const CRUD = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  // const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const subTodos = dbService.collection("todos").onSnapshot((snap) => {
      // setIsPending(true);
      const data = snap.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id } as Todo)
      );

      setTodos(data);
      // setTimeout(() => setIsPending(false), 1000);
    });

    subTodos;
    return subTodos;
  }, []);

  return (
    <div>
      <CRUDForm />

      <ul className="border max-w-75 p-5 mx-auto flex flex-col gap-y-2.5">
        {todos.map((t) => (
          <li key={t.id}>
            <CRUDItem {...t} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CRUD;
