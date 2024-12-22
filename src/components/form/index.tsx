"use client";

import { getRelatedSearch } from "@/actions";
import { debounce } from "@/lib/utils";
import { EraserIcon } from "lucide-react";
import {
  useEffect,
  useState,
  useCallback,
  type ChangeEvent,
  useRef,
  useMemo,
} from "react";
import SuggestionItem from "../suggestion-search";
import SelectedResult from "../selected-result";

export default function Form() {
  const [prompt, setPrompt] = useState("");
  const [relatedResults, setRelatedResults] = useState<any[]>([]);
  const [selectedResult, setSelectedResult] = useState<any | null>(null);
  const [isResultsVisible, setResultsVisible] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const searchRelatedMusic = useCallback(async (prompt: string) => {
    if (prompt.length < 3) return;

    const body = { prompt };
    const results = await getRelatedSearch(body);
    setRelatedResults(results);
    console.log(results);
  }, []);

  const debouncedSearchRelatedMusic = useMemo(
    () => debounce(searchRelatedMusic, 500),
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

  function clearSearch(e: React.MouseEvent) {
    e.preventDefault();
    setPrompt("");
    inputRef.current?.focus();
  }

  const submit = (e: any) => {
    e.preventDefault();
  };

  const handleClickOutside = (e: any) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setResultsVisible(false);
    }
  };

  const handleMusicSelection = (result: any) => {
    setSelectedResult(result);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="w-full max-w-md space-y-4 duration-1200 ease-in-out animate-in fade-in slide-in-from-bottom-4 mb-4">
        <form
          onSubmit={submit}
          className="flex h-fit w-full flex-row items-center rounded-xl bg-black px-1 shadow-lg"
          autoComplete="off"
        >
          <input
            ref={inputRef}
            id="input"
            onChange={handlePrompt}
            type="text"
            value={prompt}
            placeholder="Type an album, song o artist..."
            className="h-10 w-full resize-none bg-transparent px-2 font-mono text-base text-white placeholder:text-gray-400 sm:text-sm border-0 outline-none ring-0 focus:ring-0 transition-all duration-300"
            name="prompt"
            onClick={() => setResultsVisible(true)}
          />

          <button
            type="button"
            onClick={(e) => clearSearch(e)}
            className="flex aspect-square h-8 w-8 items-center justify-center rounded-lg text-white outline-0 ring-0 hover:bg-white/25 focus-visible:bg-white/25"
          >
            <EraserIcon width={18} height={18} />
          </button>
        </form>
        {isResultsVisible && (
          <ul className="max-h-80 overflow-auto m-0">
            {relatedResults.map((r) => {
              return (
                <SuggestionItem
                  key={r.result.id}
                  result={r}
                  onClick={() => {
                    handleMusicSelection(r);
                    setResultsVisible(false);
                  }}
                />
              );
            })}
          </ul>
        )}
        {selectedResult && false && (
          <SelectedResult
            data={selectedResult}
            handleGenerateClick={(selection) => console.log(selection)}
          />
        )}
      </div>
    </>
  );
}
