import { create } from "zustand";
import { BookingParams } from "../models/booking";

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

export const useBookingParams = createGenericStore<Partial<BookingParams>>();
