import axios from "axios";

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
let cachedToken: { access_token: string; expires_at: number } | null = null;

export async function GET() {
  try {
    const now = Math.floor(Date.now() / 1000);
    if (cachedToken && cachedToken.expires_at > now) {
      return Response.json({ access_token: cachedToken.access_token });
    }

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
      "base64"
    );

    const { data } = await axios.post(SPOTIFY_TOKEN_URL, params, {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    cachedToken = {
      access_token: data.access_token,
      expires_at: now + data.expires_in,
    };

    return Response.json({ access_token: cachedToken.access_token });
  } catch (error) {
    console.error("Error fetching Spotify token:", error);
    return Response.json(
      { error: "Failed to fetch Spotify token" },
      { status: 500 }
    );
  }
}
