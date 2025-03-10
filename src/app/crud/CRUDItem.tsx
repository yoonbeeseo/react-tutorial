import { useState, useCallback } from "react";
import { Todo } from ".";
import { Button, Container } from "../../components";
import CRUDForm from "./CRUDForm";
import { dbService } from "../../lib";
import { Alert } from "../../contexts";

const CRUDItem = ({ id, isDone, text }: Todo) => {
  const [isEditing, setIsEditing] = useState(false);
  const editHandler = useCallback(() => setIsEditing((prev) => !prev), []);

  const { alert } = Alert.use();

  const onDelete = useCallback(() => {
    alert("삭제하시겠습니까?", [
      { text: "취소" },
      {
        text: "삭제",
        onClick: async () => {
          const ref = dbService.collection("todos").doc(id);

          try {
            await ref.delete();
            alert("삭제되었습니다.");
          } catch (error: any) {
            alert(error.message);
          }
        },
      },
    ]);
  }, [id, alert]);

  const onDone = useCallback(async () => {
    const ref = dbService.collection("todos").doc(id);

    try {
      const newItem: Todo = { isDone: !isDone, id: "", text: "" };
      await ref.update(newItem);
      alert(isDone ? "다시 진행합니다." : "끝났습니다.");
    } catch (error: any) {
      alert(error.message);
    }
  }, [id, isDone, alert]);

  return isEditing ? (
    <CRUDForm
      payload={{
        id,
        isDone,
        text,
      }}
      onDone={editHandler}
    />
  ) : (
    <div>
      <p>{text}</p>
      <p>{id}</p>
      <Container.Row>
        <Button.Opacity onClick={onDone}>
          {isDone ? "끝" : "진행중"}
        </Button.Opacity>
        <Button.Opacity onClick={editHandler}>수정</Button.Opacity>
        <Button.Opacity onClick={onDelete}>삭제</Button.Opacity>
      </Container.Row>
    </div>
  );
};

export default CRUDItem;
