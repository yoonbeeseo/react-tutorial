import { create } from "zustand";

export interface Item {
  title: string;
  manager: Manager | "";
  status: Status | "";
  id: string;
  descs: string[];
}

export type Manager = "강산" | "허승이" | "김영화" | "유경환" | "강찬희";

export type Status = "진행중" | "계획중" | "완료";

export interface Props {
  items: Item[];
  create: (newItem: Item) => void;
  update: (updatedItem: Item) => void;
  remove: (id: string) => void;

  payload: null | Item;
  setPayload: (payload: Item) => void;
}

export const use = create<Props>((set) => ({
  items: [
    {
      descs: [],
      id: "asdfasdfds",
      manager: "강산",
      status: "계획중",
      title: "요구사항 명세서 앱 만들기",
    },
  ],
  create: (newItem) =>
    set((prev) => ({
      ...prev,

      items: [newItem, ...prev.items],
    })),
  update: (updatedItem) =>
    set((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        updatedItem.id === item.id ? updatedItem : item
      ),
    })),
  remove: (deletedId) =>
    set((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== deletedId),
    })),
  payload: null,
  setPayload: (payload) => set((prev) => ({ ...prev, payload })),
}));
