import { SearchSuggestion } from "@/types";
import Image from "next/image";

interface SuggestionSearchParams {
  result: SearchSuggestion;
  onClick: () => void;
}

export default function SuggestionSearch(params: SuggestionSearchParams) {
  const d = params.result;

  return (
    <div
      {...params}
      className="w-full inline-flex px-2 py-2 items-center justify-start gap-4 text-base text-gray-500 bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer border-b border-white/5 last:border-b-0"
    >
      <div>
        <Image
          className="rounded-full size-8"
          placeholder="empty"
          width={84}
          height={84}
          src={d.img.small}
          alt={`Album cover ${d.album} by ${d.artist}`}
        />
      </div>
      <span className="flex-1">
        {d.album} - {d.artist}{" "}
      </span>
    </div>
  );
}
