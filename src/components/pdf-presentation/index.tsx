import type { SearchSuggestion } from "@/types";
import PdfPresentationHeader from "./header";
interface PdfPresentationProps {
  search: SearchSuggestion | null;
  data: string | null;
  onClear: () => void;
}

function PdfPresentation({ data, onClear, search }: PdfPresentationProps) {
  return (
    <div
      className="isolate flex w-full flex-col flex-nowrap items-stretch gap-4 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-white/10 px-4 py-4 shadow-2xl"
      style={{ marginTop: 48 }}
    >
      <PdfPresentationHeader search={search} data={data} onClear={onClear} />
      <div className="relative aspect-square overflow-hidden max-h-160 rounded-xl border border-white/5">
        {!data && (
          <div className="h-full w-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 absolute inset-0 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"></div>
          </div>
        )}
        {data && (
          <div className="relative h-full bg-white/5 backdrop-blur-sm">
            <div
              className="p-4 text-white/90 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/80 pointer-events-none"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PdfPresentation;
