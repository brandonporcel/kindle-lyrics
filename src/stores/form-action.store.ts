import { SearchSuggestion } from "@/types";
import { create } from "zustand";
type Status = "to-search" | "pdf-preview";

interface FormActionState {
  isGeneratingPdf: boolean;
  setIsGeneratingPdf: (value: boolean) => void;

  status: Status;
  setStatus: (status: Status) => void;

  selectedResult: SearchSuggestion | null;
  setSelectedResult: (value: SearchSuggestion | null) => void;

  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

const useFormActionStore = create<FormActionState>((set) => ({
  isGeneratingPdf: false,
  setIsGeneratingPdf: (value) => set({ isGeneratingPdf: value }),

  status: "to-search",
  setStatus: (status) => set({ status }),

  selectedResult: null,
  setSelectedResult: (value) => set({ selectedResult: value }),

  isLoading: false,
  setIsLoading: (value) => set({ isLoading: value }),
}));

export default useFormActionStore;
