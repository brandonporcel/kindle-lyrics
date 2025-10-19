"use server";
import axios from "axios";
import { SearchSuggestion } from "@/types";
import { getSpotifyId } from "@/lib/utils";

export const getAIRecommendations = async () => {
  try {
    const { data } = await axios.get(
      "https://rich-music.vercel.app/api/randomLimit/3"
    );

    return data.map(
      (item: any): SearchSuggestion => ({
        id: getSpotifyId(item.spotifyId) || item._id,
        artist: item.artist || item.name,
        album: item.name,
        img: {
          medium: item.thumbnail,
          small: item.thumbnail,
          large: item.thumbnail,
        },
        type: "album" as const,
      })
    );
  } catch (error) {
    console.error("Failed to fetch AI recommendations:", error);
    return [];
  }
};
