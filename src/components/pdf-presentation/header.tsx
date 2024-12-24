import {
  BanIcon,
  DownloadIcon,
  EllipsisIcon,
  HeartIcon,
  LoaderCircleIcon,
} from "lucide-react";
import { SearchSuggestion } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type PdfPresentationHeaderProps = {
  search: SearchSuggestion | null;
  data: string | null;
  onClear: () => void;
};

function PdfPresentationHeader({
  search,
  onClear,
}: PdfPresentationHeaderProps) {
  return (
    <div className="relative flex flex-row flex-nowrap items-center">
      <p className="truncate font-mono sm:text-sm" title="cat">
        {search ? `${search.album} - ${search.artist}` : "lyrics"}
      </p>
      <span className="inline-block w-full flex-1"></span>
      <div
        aria-hidden="false"
        className="flex flex-row flex-nowrap items-center gap-2 transition-opacity duration-200 ease-out opacity-100"
      >
        <button className="group relative inline-flex flex-shrink-0 items-center justify-center select-none truncate transition duration-200 ease-out disabled:pointer-events-auto disabled:opacity-50 shadow ring-1 ring-gray-200 hover:bg-gray-200 dark:ring-gray-600 dark:hover:bg-gray-800 px-2.5 sm:px-2 py-2 h-9 sm:h-8 sm:text-sm rounded-lg font-medium">
          <span className="sr-only">Save album</span>
          <HeartIcon size={16} className="text-red-500 fill-red-500" />
          {/* todo-make logic to btn actions and make work this loader */}
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
          className="group relative inline-flex flex-shrink-0 items-center justify-center truncate transition duration-200 ease-out disabled:pointer-events-auto disabled:opacity-50 shadow ring-1 ring-gray-200 hover:bg-gray-200 dark:ring-gray-600 dark:hover:bg-gray-800 px-2.5 sm:px-2 py-2 h-9 sm:h-8 sm:text-sm rounded-lg font-medium input-focus-ring select-none"
          type="button"
          id="radix-:r3k:"
          aria-haspopup="menu"
          aria-expanded="false"
          data-state="closed"
        >
          <span className="sr-only">Share</span>
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
              className="group relative inline-flex flex-shrink-0 items-center justify-center truncate transition duration-200 ease-out disabled:pointer-events-auto disabled:opacity-50 shadow ring-1 ring-gray-200 hover:bg-gray-200 dark:ring-gray-600 dark:hover:bg-gray-800 px-2.5 sm:px-2 py-2 h-9 sm:h-8 sm:text-sm rounded-lg font-medium input-focus-ring select-none"
              type="button"
              id="radix-:r3m:"
              aria-haspopup="menu"
              aria-expanded="false"
              data-state="closed"
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
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>More options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={onClear}>
                <BanIcon />
                <span>Cancel PDF</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        {/*  */}
      </div>
    </div>
  );
}

export default PdfPresentationHeader;
