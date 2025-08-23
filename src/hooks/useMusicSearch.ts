import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { toast } from "sonner";
import { debounce } from "@/lib/utils";
import { getRelatedSearch } from "@/actions";
import { SearchSuggestion } from "@/types";
import useMusicSearchStore from "@/stores/music-search.store";

function useMusicSearch() {
  const { isFocused, setIsFocused } = useMusicSearchStore();
  const [prompt, setPrompt] = useState("");
  const [relatedResults, setRelatedResults] = useState<SearchSuggestion[]>([]);
  const [isResultsVisible, setResultsVisible] = useState(false);
  const [reloadCount, setReloadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const searchRelatedMusic = useCallback(async (prompt: string) => {
    if (prompt.length < 3) {
      setRelatedResults([]);
      return;
    }

    setIsLoading(true);
    toast.loading("Loading...", { id: "loading" });

    try {
      const res = await getRelatedSearch({ prompt });
      setRelatedResults(res);
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error inesperado. Por favor intenta más tarde.");
    } finally {
      setIsLoading(false);
      toast.dismiss("loading");
    }
  }, []);

  const debouncedSearchRelatedMusic = useMemo(
    () => debounce(searchRelatedMusic, 600),
    [searchRelatedMusic]
  );

  const handlePromptChange = useCallback(
    (value: string) => {
      setPrompt(value);
      debouncedSearchRelatedMusic(value);
    },
    [debouncedSearchRelatedMusic]
  );

  const clearSearch = () => {
    setPrompt("");
    inputRef.current?.focus();
    setRelatedResults([]);
  };

  const reloadRecs = () => setReloadCount((prev) => prev + 1);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setResultsVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return {
    prompt,
    relatedResults,
    isResultsVisible,
    isFocused,
    reloadCount,
    isLoading,
    inputRef,
    setResultsVisible,
    setIsFocused,
    handlePromptChange,
    clearSearch,
    reloadRecs,
  };
}
export default useMusicSearch;
