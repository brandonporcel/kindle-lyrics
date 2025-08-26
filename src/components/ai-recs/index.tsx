import { useActionState, startTransition } from "react";
import { useEffect } from "react";
import { getAIRecommendations } from "@/actions";
import type { SearchSuggestion } from "@/types";
import { onErrorImage } from "@/lib/utils";
import useMusicSearch from "@/hooks/useMusicSearch";
import useFormAction from "@/hooks/useFormAction";

type AIRecsProps = {
  reloadRecs: number;
};

function AIRecs({ reloadRecs }: AIRecsProps) {
  const [recommendations, action, pending] = useActionState<SearchSuggestion[]>(
    getAIRecommendations,
    [] as SearchSuggestion[]
  );

  const { handleBasicSelection } = useMusicSearch();
  const { isLoading } = useFormAction();
  useEffect(() => {
    startTransition(() => {
      action();
    });
  }, [action, reloadRecs]);

  return (
    <div className="flex flex-wrap gap-2 absolute justify-center w-full left-0">
      {pending ? (
        <>
          {[1, 2, 3].map((_, index) => (
            <div
              key={`loading-${index}`}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-700/50 animate-pulse"
            >
              <div className="w-6 h-6 rounded-full bg-gray-600/50 shimmer" />
              <div className="w-20 h-4 bg-gray-600/50 rounded shimmer" />
            </div>
          ))}
        </>
      ) : (
        recommendations.map((rec) => (
          <button
            key={rec.id}
            disabled={isLoading}
            onClick={() => handleBasicSelection(rec)}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-gray-800/30 to-gray-700/30 border border-gray-600/30 hover:border-gray-500/50 hover:bg-gradient-to-r hover:from-gray-700/40 hover:to-gray-600/40 transition-all duration-200 group"
          >
            <img
              src={
                rec.img.medium ||
                "https://images.squarespace-cdn.com/content/v1/5d2e2c5ef24531000113c2a4/1564770283101-36J6KM8EIK71FOCGGDM2/album-placeholder.png?format=1000w"
              }
              onError={onErrorImage}
              alt={rec.album}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
              {rec.album}
            </span>
          </button>
        ))
      )}
    </div>
  );
}

export default AIRecs;
