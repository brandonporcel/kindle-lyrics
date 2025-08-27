"use client";

import {
  BanIcon,
  DownloadIcon,
  EllipsisIcon,
  HeartIcon,
  LoaderCircleIcon,
} from "lucide-react";
import type { SearchSuggestion } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useFormAction from "@/hooks/useFormAction";

type PdfPresentationHeaderProps = {
  search: SearchSuggestion | null;
  data: string | null;
  onClear: () => void;
};

function PdfPresentationHeader({
  search,
  onClear,
}: PdfPresentationHeaderProps) {
  const { isLoading, isGeneratingPdf } = useFormAction();

  return (
    <div className="relative flex flex-row flex-nowrap items-center">
      <p className="truncate font-mono text-sm text-white/90" title="lyrics">
        {search ? `${search.album} - ${search.artist}` : "lyrics"}
      </p>
      <span className="inline-block w-full flex-1"></span>
      <div
        aria-hidden="false"
        className="flex flex-row flex-nowrap items-center gap-2 transition-opacity duration-200 ease-out opacity-100"
      >
        <button
          className="group relative inline-flex flex-shrink-0 items-center justify-center select-none truncate transition-all duration-200 ease-out disabled:pointer-events-auto disabled:opacity-50 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-sm px-2.5 py-2 h-9 text-sm rounded-lg font-medium"
          disabled={isLoading || isGeneratingPdf}
        >
          <span className="sr-only">Save album</span>
          <HeartIcon size={16} className="text-red-500 fill-red-500" />
          {false && (
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ease-out"
            >
              <LoaderCircleIcon size={16} className="animate-spin" />
            </span>
          )}
        </button>
        <button
          className="group relative inline-flex flex-shrink-0 items-center justify-center truncate transition-all duration-200 ease-out disabled:pointer-events-auto disabled:opacity-50 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-sm px-2.5 py-2 h-9 text-sm rounded-lg font-medium select-none text-white/80 hover:text-white"
          type="button"
          disabled={isLoading || isGeneratingPdf}
        >
          <span className="sr-only">Download</span>
          <DownloadIcon size={16} />
          {false && (
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ease-out"
            >
              <LoaderCircleIcon size={16} className="animate-spin" />
            </span>
          )}
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="group relative inline-flex flex-shrink-0 items-center justify-center truncate transition-all duration-200 ease-out disabled:pointer-events-auto disabled:opacity-50 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-sm px-2.5 py-2 h-9 text-sm rounded-lg font-medium select-none text-white/80 hover:text-white"
              type="button"
            >
              <span className="sr-only">More options</span>
              <EllipsisIcon size={16} />
              {false && (
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ease-out"
                >
                  <LoaderCircleIcon size={16} className="animate-spin" />
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-gray-900/95 backdrop-blur-sm border-white/10">
            <DropdownMenuLabel className="text-white/90">
              More options
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={onClear}
                className="text-white/80 hover:text-white hover:bg-white/10"
              >
                <BanIcon />
                <span>Cancel PDF</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default PdfPresentationHeader;
