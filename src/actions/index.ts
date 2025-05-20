"use server";
import axios from "axios";
import { parseAlbumTracks, parseSearchResults } from "@/lib/parser.service";
import { sendMailWithPDF } from "@/lib/nodemailer";
import { getSpotifyAccessToken } from "@/helpers/tokenManager";
import * as cheerio from "cheerio";

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

const fetchLyricsFromLyricsFreak = async (track: {
  artist: string;
  name: string;
}) => {
  try {
    const searchUrl = `https://www.lyricsfreak.com/search.php?q=${track.artist}%20${track.name}`;
    const { data: searchHtml } = await axios.get(searchUrl);

    const $search = cheerio.load(searchHtml);
    const resultLink = $search(".lf-list__cell.lf-list__meta a").attr("href");

    if (resultLink) {
      const lyricsPageUrl = `https://www.lyricsfreak.com${resultLink}`;
      const { data: lyricsHtml } = await axios.get(lyricsPageUrl);

      const $lyrics = cheerio.load(lyricsHtml);
      const lyricsContent = $lyrics("div#content").html();

      return lyricsContent || "Lyrics not found.";
    }
  } catch (err) {
    console.error(`Failed to fetch lyrics from LyricsFreak: ${err}`);
  }

  return "Lyrics not found.";
};

export const getPDFTemplate = async ({ albumId }: { albumId: string }) => {
  const url = `${SPOTIFY_API}/albums/${albumId}/tracks`;
  const token = await getSpotifyAccessToken();

  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const albumTracks = response.data?.items;
    if (!albumTracks?.length) {
      throw new Error("The album does not contain any tracks.");
    }

    const tracks = parseAlbumTracks(albumTracks);
    let template = "";
    console.log("tracks", tracks);
    for (const track of tracks) {
      let lyrics = "Lyrics not available.";

      try {
        const { data } = await axios.get(
          `https://api.lyrics.ovh/v1/${track.artist}/${track.name}`
        );
        lyrics = data.lyrics || lyrics;
      } catch {
        lyrics = await fetchLyricsFromLyricsFreak(track);
      }

      template += `
        <div class="page">
          <h1>${track.artist} - ${track.name}</h1>
          <p class='pdf-lyrics'>${lyrics}</p>
        </div>`;
    }

    return generateHtmlTemplate(template);
  } catch (error: any) {
    throw new Error(`Failed to fetch album tracks: ${error.message}`);
  }
};

const generateHtmlTemplate = (template: string): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Kindle-Genius</title>
        <style>
            body {
                margin: 0;
                font-family: Arial, sans-serif;
            }
            p.pdf-lyrics {
              white-space: pre-wrap;
              margin: 0 0 20px;
            }
            .page {
              page-break-after: always;
            }
        </style>
    </head>
    <body>
      ${template}
    </body>
    </html>
  `;
};

export const sendAlbumEmail = async ({
  email,
  template,
  albumName,
}: {
  email: string;
  albumName: string;
  template: string;
}) => {
  try {
    const response = await sendMailWithPDF({
      to: email,
      subject: "convert",
      text: "",
      html: `<p>${albumName}</p>`,
      pdfContent: template,
      filename: albumName + ".pdf",
    });

    return response;
  } catch (error: any) {
    throw new Error(error.message);
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

export async function generatePDF(data: { source: string }) {
  const apiKey = process.env.PDFSHIFT_TOKEN;
  if (!apiKey) throw new Error("No PDF SHIFT token provided");

  try {
    const response = await axios.post(
      "https://api.pdfshift.io/v3/convert/pdf",
      data,
      {
        responseType: "arraybuffer",
        auth: {
          username: "api",
          password: apiKey,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error generating PDF with PDFShift:", error.message);
    throw error.message;
  }
}
