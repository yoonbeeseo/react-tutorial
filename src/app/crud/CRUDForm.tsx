import { useState, useMemo, useCallback, useRef } from "react";
import { Button, Container, Form } from "../../components";
import { Todo } from ".";
import { dbService } from "../../lib";

interface Props {
  payload?: Todo;
  onDone?: () => void;
}

const CRUDForm = ({ onDone, payload }: Props) => {
  const initialState = useMemo<Todo>(() => {
    if (payload) {
      return payload;
    }
    return { id: "", isDone: false, text: "" };
  }, [payload]);

  const [todo, setTodo] = useState(initialState);

  const ref = useRef<HTMLInputElement>(null);

  const onSubmit = useCallback(async () => {
    if (todo.text.length === 0) {
      alert("할 일을 입력하세요.");
      return ref.current?.focus();
    }
    if (payload && payload.text === todo.text) {
      alert("변경사항이 없습니다.");
      return ref.current?.focus();
    }

    const todoRef = dbService.collection("todos");

    try {
      if (payload) {
        //Todo: 수정로직
        await todoRef.doc(payload.id).update(todo);
        alert("수정되었습니다.");
      } else {
        //Todo: CREATE
        await todoRef.add(todo);
        // await todoRef.doc(todo.id).set(todo);
        alert("추가되었습니다.");
        setTodo(initialState);
      }

      if (onDone) {
        onDone();
      }
    } catch (error: any) {
      return alert(error.message);
    }
  }, [onDone, todo, ref, payload, initialState]);

  return (
    <Form.Container className="w-full max-w-75 p-5 mx-auto" onSubmit={onSubmit}>
      <Container.Col className="gap-y-1">
        <Form.Label htmlFor="todo">할일</Form.Label>
        <Form.Input
          id="todo"
          ref={ref}
          value={todo.text}
          onChange={(e) =>
            setTodo((prev) => ({ ...prev, text: e.target.value }))
          }
          placeholder="할 일을 추가하세요."
        />
      </Container.Col>
      <Button.Opacity type="submit" className="bg-sky-500 text-white">
        {payload ? "수정" : "추가"}
      </Button.Opacity>
    </Form.Container>
  );
};

export default CRUDForm;
