import React, { useMemo } from "react";
import { Item, Alert } from "./store";
import { useParams, useNavigate } from "react-router-dom";

const RequirementDetail = () => {
  const { items, remove, payload } = Item.use();
  const { alert } = Alert.use();
  const params = useParams<{ id: string }>();
  const navi = useNavigate();

  const item = useMemo<Item.Item>(() => {
    if (payload) {
      return payload;
    }
    const foundItem = items.find((i) => i.id === params.id);
    if (foundItem) {
      return foundItem;
    }
    return {
      descs: [],
      id: "",
      manager: "",
      status: "",
      title: "",
    };
  }, [payload, params, items]);

  return (
    <div>
      {item.title}
      {item.manager} {item.status}
      {item.id}
      <button
        onClick={() => {
          navi("edit");
        }}
      >
        수정
      </button>
      <button
        onClick={() => {
          remove(item.id);
          alert("삭제되었습니다.");
          navi("/requirement");
        }}
      >
        삭제
      </button>
    </div>
  );
};

export default RequirementDetail;
