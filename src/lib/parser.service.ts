import { AlbumTrack, SearchSuggestion } from "@/types";

export const parseSearchResults = (data: any[]): SearchSuggestion[] => {
  return data.map((result) => parseSearchResult(result));
};

export const parseSearchResult = (data: any): SearchSuggestion => {
  return {
    id: data.id,
    artist: data.artists[0].name,
    album: data.name,
    date: data.date,
    img: {
      small: data.images[0].url,
      medium: data.images[1].url,
      large: data.images[2].url,
    },
    type: data.album_type,
  };
};

export const parseAlbumTracks = (items: any[]): AlbumTrack[] => {
  return items.map((item) => parseTrack(item));
};

export const parseTrack = (data: any): AlbumTrack => {
  return {
    id: data.id,
    name: data.name,
    artist: data.artists[0].name,
  };
};

export function cleanTrackName(name: string) {
  return name.replace(/- Remastered.*/i, "").trim();
}
