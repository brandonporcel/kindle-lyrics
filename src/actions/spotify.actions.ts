"use server";
import axios from "axios";
import { getSpotifyAccessToken } from "@/helpers/tokenManager";
import { parseSearchResults } from "@/lib/parser.service";

const SPOTIFY_API = "https://api.spotify.com/v1";

export const getRelatedSearch = async ({ prompt }: { prompt: string }) => {
  const accessToken = await getSpotifyAccessToken();

  const params = new URLSearchParams({
    type: "album",
    q: prompt,
    limit: "3",
  });

  const url = `${SPOTIFY_API}/search?${params.toString()}`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!data.albums || !data.albums.items) return [];

    return parseSearchResults(data.albums.items);
  } catch (error: any) {
    throw new Error(error.message || "Unknown error occurred");
  }
};

export const refreshToken = async () => {
  const {
    SPOTIFY_CLIENT_ID: client_id,
    SPOTIFY_CLIENT_SECRET: client_secret,
    SPOTIFY_REFRESH_TOKEN: refresh_token,
  } = process.env;

  if (!refresh_token) throw new Error("No refresh token provided");

  const authOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${client_id}:${client_secret}`
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  };

  try {
    const response = await fetch(
      "https://accounts.spotify.com/api/token",
      authOptions
    );

    if (!response.ok) {
      throw new Error(`Failed to refresh token. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error refreshing token:", error.message);
  }
};
