import { create } from "zustand";

interface ParamsStore {
  value: RootRequest;
  setValue: (payload: RootRequest) => void;
}

export const useParamStore = create<ParamsStore>((set) => ({
  value: {
    index: 1,
    size: 10,
    keyword: "",
  },
  setValue: (payload: RootRequest) => set({ value: payload }),
}));
