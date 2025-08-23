import { create } from "zustand";
type Status = "to-search" | "pdf-preview";

interface FormActionState {
  isGeneratingPdf: boolean;
  setIsGeneratingPdf: (value: boolean) => void;

  status: Status;
  setStatus: (status: Status) => void;
}

const useFormActionStore = create<FormActionState>((set) => ({
  isGeneratingPdf: false,
  setIsGeneratingPdf: (value) => set({ isGeneratingPdf: value }),

  status: "to-search",
  setStatus: (status) => set({ status }),
}));

export default useFormActionStore;
