import { create } from "zustand";

type DialogType = "forgotPassword" | null;

interface DialogState {
  isOpen: boolean;
  type: DialogType;
  openDialog: (type: DialogType) => void;
  closeDialog: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  type: null,
  openDialog: (type) => set({ isOpen: true, type }),
  closeDialog: () => set({ isOpen: false, type: null }),
}));
