"use client";

import { getPDFTemplate, getRelatedSearch, sendAlbumEmail } from "@/actions";
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
import { SearchSuggestion } from "@/types";
import PdfPresentation from "../pdf-presentation";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Form() {
  const [prompt, setPrompt] = useState("");
  const [relatedResults, setRelatedResults] = useState<SearchSuggestion[]>([]);
  const [selectedResult, setSelectedResult] = useState<SearchSuggestion | null>(
    null
  );
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [showPdfPresentation, setShowPdfPresentation] = useState(false);
  const [scrapingResult, setScrapingResult] = useState<string | null>(null);
  const [isResultsVisible, setResultsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSendingPdf, setIsSendingPdf] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const searchRelatedMusic = useCallback(async (prompt: string) => {
    if (prompt.length < 3) return;

    const body = { prompt };
    const res = await getRelatedSearch(body);
    setRelatedResults(res);
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

  const handleGenerateClick = async (): Promise<void> => {
    if (!selectedResult) return;
    try {
      setIsGeneratingPdf(true);
      setShowPdfPresentation(true);

      const res = await getPDFTemplate({ albumId: selectedResult.id });
      setScrapingResult(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleSendPdf = async (e: any) => {
    e.preventDefault();
    if (!scrapingResult) return;

    try {
      setIsSendingPdf(true);
      const body = {
        template: scrapingResult,
        email: "brandon7.7porcel@gmail.com",
        albumName: selectedResult ? selectedResult.album : "album",
      };

      await sendAlbumEmail(body);
      clearSearch(e);
    } catch (error) {
      console.log(error);
    } finally {
      setScrapingResult(null);
      setIsSendingPdf(false);
    }
  };

  const handleClickOutside = (e: any) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setResultsVisible(false);
    }
  };

  const handleMusicSelection = (result: SearchSuggestion) => {
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
                  key={r.id}
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

        {showPdfPresentation && <PdfPresentation data={scrapingResult} />}

        {selectedResult && !isGeneratingPdf && (
          <SelectedResult
            data={selectedResult}
            handleGenerateClick={handleGenerateClick}
          />
        )}

        {!isGeneratingPdf && scrapingResult && (
          <form onSubmit={handleSendPdf}>
            <div className="grid w-full items-center gap-1.5 mb-2">
              <Label htmlFor="email">Email</Label>
              <Input
                required={true}
                placeholder="brandon@gmail.com"
                onChange={(v) => setEmail(v.target.value)}
                value={email}
                type="email"
              />
            </div>
            <Button className="w-full" type="submit" disabled={isSendingPdf}>
              Send PDF
            </Button>
          </form>
        )}
      </div>
    </>
  );
}
