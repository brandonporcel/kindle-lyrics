"use client";

import { EraserIcon, SearchIcon, SparklesIcon } from "lucide-react";
import SuggestionItem from "../suggestion-search";
import AIRecs from "../ai-recs";
import useMusicSearch from "@/hooks/useMusicSearch";
import useFormAction from "@/hooks/useFormAction";

function Form() {
  const {
    prompt,
    relatedResults,
    isSearchResultsVisible,
    isFocused,
    reloadCount,
    inputRef,
    setSearchResultsVisible,
    setIsFocused,
    handlePromptChange,
    clearSearch,
    reloadRecs,
    handleBasicSelection,
  } = useMusicSearch();
  const { isLoading } = useFormAction();

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={`flex h-fit w-full flex-row items-center rounded-xl bg-black px-1 shadow-lg transition-all duration-300 border relative ${
          isFocused ? "border-white/20 shadow-xl" : "border-transparent"
        }`}
        autoComplete="off"
      >
        <input
          ref={inputRef}
          type="text"
          value={prompt}
          placeholder="Type an album or artist you like..."
          className="h-10 w-full resize-none bg-transparent px-2 font-mono text-base text-white placeholder:text-gray-400 sm:text-sm border-0 outline-none ring-0"
          onChange={(e) => handlePromptChange(e.target.value)}
          onClick={() => setSearchResultsVisible(true)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {!prompt && (
          <div
            className="flex aspect-square h-8 w-8 items-center justify-center rounded-lg text-gray-400 ml-1"
            onClick={() => inputRef.current?.focus()}
          >
            <SearchIcon width={18} height={18} />
          </div>
        )}
        {prompt && (
          <button
            type="button"
            onClick={clearSearch}
            className="flex aspect-square h-8 w-8 items-center justify-center rounded-lg text-white hover:bg-white/10 cursor-pointer disabled:opacity-50 disabled:cursor-default"
            disabled={isLoading}
          >
            <EraserIcon width={18} height={18} />
          </button>
        )}
        <button
          type="button"
          onClick={reloadRecs}
          className="flex aspect-square h-8 w-8 items-center justify-center rounded-lg text-white hover:bg-white/10 disabled:opacity-50"
          disabled={isLoading}
        >
          <SparklesIcon width={18} height={18} />
        </button>
      </form>

      {isSearchResultsVisible && (
        <ul className="max-h-80 overflow-auto rounded-lg bg-black/80 backdrop-blur-sm border border-white/10 mt-2 absolute max-w-lg z-50 left-1/2 -translate-x-1/2">
          {relatedResults.map((r) => (
            <SuggestionItem
              key={r.id}
              result={r}
              onClick={() => handleBasicSelection(r)}
            />
          ))}
        </ul>
      )}

      <AIRecs reloadRecs={reloadCount} />
    </>
  );
}

export default Form;
