import { create } from "zustand";

export interface Props {
  성씨: string;
  조상들: string[];
  조상추가: (새로운조상: string) => void;
}

export const use = create<Props>()((set) => ({
  성씨: "박씨",
  조상들: ["박증조", "박고조", "박조상"],
  조상추가: (새로운조상: string) =>
    set((prev) => ({ ...prev, 조상들: [새로운조상, ...prev.조상들] })),
}));
