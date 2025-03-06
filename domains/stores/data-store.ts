import { create } from "zustand";

interface GenericState<T> {
  data: T | null;
  setData: (payload: T) => void;
  clearData: () => void;
}

export const createGenericStore = <T>() =>
  create<GenericState<T>>((set) => ({
    data: null,
    setData: (payload) => set({ data: payload }),
    clearData: () => set({ data: null }),
  }));
