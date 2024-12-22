import Image from "next/image";

interface SuggestionSearchParams {
  result: any;
  onClick: () => void;
}

export default function SuggestionSearch(params: SuggestionSearchParams) {
  const { result } = params.result;
  return (
    <>
      <a
        {...params}
        href="#"
        className="w-full mb-2 inline-flex px-2 py-2 items-center justify-start gap-4 text-base text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        <div>
          <Image
            className="rounded-full size-8"
            width={84}
            height={84}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Googleplex_HQ_%28cropped%29.jpg/640px-Googleplex_HQ_%28cropped%29.jpg"
            alt={result.full_title}
          />
        </div>
        <span className="flex-1">{result.full_title}</span>
      </a>
    </>
  );
}
