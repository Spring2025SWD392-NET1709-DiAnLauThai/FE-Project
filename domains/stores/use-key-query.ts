import { create } from "zustand";

interface KeyQuery {
  keyword: string;
  setKeyword: (keyword: string) => void;
}

export const useKeyQueryStore = create<KeyQuery>((set) => ({
  keyword: "",
  setKeyword: (keyword) => set({ keyword }),
}));
