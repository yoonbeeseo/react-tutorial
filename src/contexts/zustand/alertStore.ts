import { create } from "zustand";

export interface Props {
  state: boolean;
  message?: string | null;
  buttons?: Button[];
  title?: string;
  alert: (message: string | null, buttons?: Button[], title?: string) => void;
  closeFn: () => void;
}

export interface Button {
  text?: string;
  onClick?: () => void;
}

export const use = create<Props>((set) => ({
  state: false,
  alert: (message: string | null, buttons?: Button[], title?: string) =>
    set((prev) => ({ ...prev, message, buttons, title, state: true })),
  closeFn: () => set((prev) => ({ ...prev, state: false })),
}));
