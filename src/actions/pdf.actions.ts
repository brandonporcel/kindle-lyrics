"use server";
import axios from "axios";
import { getSpotifyAccessToken } from "@/helpers/tokenManager";
import { parseAlbumTracks } from "@/lib/parser.service";
import { fetchLyricsFromLyricsFreak } from "./lyrics.actions";

const SPOTIFY_API = "https://api.spotify.com/v1";

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

export const getPDFTemplate = async ({ albumId }: { albumId: string }) => {
  const url = `${SPOTIFY_API}/albums/${albumId}/tracks`;

  try {
    const token = await getSpotifyAccessToken();
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const albumTracks = response.data?.items;
    if (!albumTracks?.length) {
      throw new Error("The album does not contain any tracks.");
    }

    const tracks = parseAlbumTracks(albumTracks);
    let template = "";
    for (const track of tracks) {
      let lyrics = "Lyrics not available.";

      try {
        const OVH_URL = `https://api.lyrics.ovh/v1/${track.artist}/${track.name}`;
        const { data } = await axios.get(OVH_URL, {
          timeout: 4000,
        });

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

    const base64 = Buffer.from(response.data).toString("base64");
    return { arrayBuffer: response.data, base64 };
  } catch (error: any) {
    console.error("Error generating PDF with PDFShift:", error.message);
    throw error.message;
  }
}
