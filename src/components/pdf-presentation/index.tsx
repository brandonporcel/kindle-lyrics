import { SearchSuggestion } from "@/types";
import PdfPresentationHeader from "./header";
import styles from "./styles.module.css";

interface PdfPresentationProps {
  search: SearchSuggestion | null;
  data: string | null;
  onClear: () => void;
}

function PdfPresentation({ data, onClear, search }: PdfPresentationProps) {
  return (
    <div className="borders isolate flex w-full flex-col flex-nowrap items-stretch gap-3 rounded-xl bg-white dark:bg-zinc-950 px-3 py-3 shadow-md ring-1 ring-gray-200">
      <PdfPresentationHeader search={search} data={data} onClear={onClear} />
      <div className="relative aspect-square overflow-hidden max-h-160">
        {!data && (
          <div
            className={`skeleton h-full w-full bg-gray-200 absolute inset-0 ${styles.animate}`}
          ></div>
        )}
        {data && (
          <div className="relative h-full">
            <div dangerouslySetInnerHTML={{ __html: data }}></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-black opacity-1 pointer-events-none"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PdfPresentation;
