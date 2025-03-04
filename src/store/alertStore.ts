import { create } from "zustand";

export interface Props {
  isShowing: boolean;
  title?: string;
  message: string | null;
  buttons?: Button[];

  alert: (message: string | null, buttons?: Button[], title?: string) => void;

  closeFn: () => void;
}

export interface Button {
  text?: string;
  onClick?: () => void;
}

export const use = create<Props>()((set) => ({
  isShowing: false,
  message: null,
  closeFn: () => set((prev) => ({ ...prev, isShowing: false })),
  alert: (message: string | null, buttons?: Button[], title?: string) =>
    set((prev) => ({ ...prev, message, buttons, title, isShowing: true })),
}));
