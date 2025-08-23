import { create } from "zustand";

interface FormActionState {
  isFocused: boolean;
  setIsFocused: (value: boolean) => void;
}

const useMusicSearchStore = create<FormActionState>((set) => ({
  isFocused: false,
  setIsFocused: (value) => set({ isFocused: value }),
}));

export default useMusicSearchStore;
