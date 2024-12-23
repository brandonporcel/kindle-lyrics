export interface SearchResultImage {
  small: string;
  medium: string;
  large: string;
}

export interface SearchSuggestion {
  id: string;
  artist: string;
  album: string;
  date: string;
  img: SearchResultImage;
  type: "album" | "artist";
}

export interface AlbumTrack {
  id: string;
  name: string;
  artist: string;
}
