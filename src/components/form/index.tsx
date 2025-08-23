"use client";

import { EraserIcon, SearchIcon } from "lucide-react";
import { toast } from "sonner";
import { getRelatedSearch } from "@/actions";
import {
  useEffect,
  useState,
  useCallback,
  type ChangeEvent,
  useRef,
  useMemo,
} from "react";
import { debounce } from "@/lib/utils";
import SuggestionItem from "../suggestion-search";
import { SearchSuggestion } from "@/types";

interface FormProps {
  onMusicSelection: (result: SearchSuggestion) => void;
}

export default function Form({ onMusicSelection }: FormProps) {
  const [prompt, setPrompt] = useState("");
  const [relatedResults, setRelatedResults] = useState<SearchSuggestion[]>([]);
  const [isResultsVisible, setResultsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const searchRelatedMusic = useCallback(async (prompt: string) => {
    if (prompt.length < 3) {
      setRelatedResults([]);
      return;
    }

    const body = { prompt };
    toast.loading("Loading...", { id: "loading" });

    try {
      const res = await getRelatedSearch(body);
      setRelatedResults(res);
    } catch (error: any) {
      console.log(error);
      toast.error("Ocurrió un error inesperado. Por favor intenta más tarde.");
    } finally {
      toast.dismiss("loading");
    }
  }, []);

  const debouncedSearchRelatedMusic = useMemo(
    () => debounce(searchRelatedMusic, 600),
    [searchRelatedMusic]
  );

  const handlePrompt = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setPrompt(v);
      debouncedSearchRelatedMusic(v);
    },
    [debouncedSearchRelatedMusic]
  );

  const clearSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    setPrompt("");
    inputRef.current?.focus();
  };

  const handleClickOutside = (e: any) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setResultsVisible(false);
    }
  };

  const handleMusicSelection = (result: SearchSuggestion) => {
    onMusicSelection(result);
    setResultsVisible(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={`flex h-fit w-full flex-row items-center rounded-xl bg-black px-1 shadow-lg transition-all duration-300 border  ${
          isFocused ? "border-white/20 shadow-xl" : "border-transparent"
        }`}
        autoComplete="off"
      >
        <input
          autoFocus
          ref={inputRef}
          id="input"
          onChange={handlePrompt}
          type="text"
          value={prompt}
          placeholder="Type an album or artist you like..."
          className="h-10 w-full resize-none bg-transparent px-2 font-mono text-base text-white placeholder:text-gray-400 sm:text-sm border-0 outline-none ring-0 focus:ring-0 transition-all duration-300"
          name="prompt"
          onClick={() => setResultsVisible(true)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {!prompt && (
          <div className="flex aspect-square h-8 w-8 items-center justify-center rounded-lg text-gray-400 ml-1">
            <SearchIcon width={18} height={18} />
          </div>
        )}
        {prompt && (
          <button
            type="button"
            onClick={(e) => clearSearch(e)}
            className="flex aspect-square h-8 w-8 items-center justify-center rounded-lg text-white outline-0 ring-0 hover:bg-white/10 cursor-default"
          >
            <EraserIcon width={18} height={18} />
          </button>
        )}
      </form>

      {isResultsVisible && relatedResults.length > 0 && (
        <ul
          className="max-h-80 overflow-auto rounded-lg bg-black/80 backdrop-blur-sm border border-white/10 mt-2"
          // Can't remove ul default margin
          style={{ marginTop: 4 }}
        >
          {relatedResults.map((r) => {
            return (
              <SuggestionItem
                key={r.id}
                result={r}
                onClick={() => handleMusicSelection(r)}
              />
            );
          })}
        </ul>
      )}
    </>
  );
}
