"use server";
import { sendMail } from "@/lib/nodemailer";
import { parseAlbumTracks, parseSearchResults } from "@/lib/parser.service";
import axios from "axios";

const SPOTIFY_API = "https://api.spotify.com/v1";

/*
lyricsfreak=>lyricsfreak usar endpoint de search para canciones y escrapear la respuesta para buscar el link de la busqueda correcta. si lo encuentra, ir y luego volver a escrapear tal respuesta(lyrics)
https://www.lyricsfreak.com/search.php?q=Smooth+Operator
--
ovh => obtener lyrics por artista y cancion
https://api.lyrics.ovh/v1/smokey%20robinson/quiet%20storm

spotify => buscar albums/artists
https://api.spotify.com/v1/search?q=bad+bunny&type=album

*/

export const getRelatedSearch = async ({ prompt }: { prompt: string }) => {
  const accessToken = process.env.SPOTIFY_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error(
      "Access token is missing. Please set SPOTIFY_ACCESS_TOKEN in your environment variables."
    );
  }

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
    throw new Error(`Failed to fetch related search: ${error.message}`);
  }
};

export const getPDFTemplate = async (data: { albumId: string }) => {
  const accessToken = process.env.SPOTIFY_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error(
      "Access token is missing. Please set SPOTIFY_ACCESS_TOKEN in your environment variables."
    );
  }

  const url = `${SPOTIFY_API}/albums/${data.albumId}/tracks`;

  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const albumTracks = response.data?.items;
    if (!albumTracks || albumTracks.length === 0) {
      throw new Error(`The album does not contain any tracks.`);
    }

    const tracks = parseAlbumTracks(albumTracks);
    let template = "";

    for (const track of tracks) {
      try {
        const lyricsResponse = await axios.get(
          `https://api.lyrics.ovh/v1/${track.artist}/${track.name}`
        );
        const lyrics = lyricsResponse.data.lyrics || "Lyrics not available.";
        template += `<h1>${track.artist} - ${track.name}</h1><p class='pdf-lyrics'>${lyrics}</p>`;
      } catch (error: any) {
        console.error(
          `Error fetching lyrics for ${track.name}:`,
          error.message
        );
        template += `<h1>${track.artist} - ${track.name}</h1><p class='pdf-lyrics'>Lyrics not available.</p>`;
      }
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
            }
            p.pdf-lyrics{
              white-space:pre-wrap;
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
  const response = await sendMail({
    sendTo: email,
    subject: `Lyrics for ${albumName}`,
    text: template,
    html: template,
  });

  return response;
};
