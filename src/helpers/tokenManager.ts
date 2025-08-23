import { refreshToken } from "@/actions";
import CONSTANTS from "@/constants";
import axiosInstance from "@/lib/axios";

const isBrowser = typeof window !== "undefined";

export const getSpotifyAccessToken = async () => {
  if (isBrowser) {
    const storedData = localStorage.getItem(CONSTANTS.LS.spotify);

    if (!storedData) {
      const token = await refreshToken();
      localStorage.setItem(
        CONSTANTS.LS.spotify,
        JSON.stringify({ updatedAt: Date.now(), token: token.access_token })
      );
      return token;
    }

    const { updatedAt, token } = JSON.parse(storedData);

    // Spotify tokens duran 3600s = 1h → uso margen de 45min
    if (Date.now() - updatedAt > 2700000) {
      const newToken = await refreshToken();
      localStorage.setItem(
        CONSTANTS.LS.spotify,
        JSON.stringify({ updatedAt: Date.now(), token: newToken.access_token })
      );
      return newToken;
    }

    return token;
  }

  // Si no hay token o expiró, lo pide al backend
  try {
    const url = "/api/spotify-token";
    const { data } = await axiosInstance.get(url);
    return data.access_token;
  } catch (error: any) {
    console.log("error: ", error.message);
    throw new Error("Failed to fetch access token on the server");
  }
};
