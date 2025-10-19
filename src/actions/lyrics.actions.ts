"use server";
import axios from "axios";
import { cleanTrackName } from "@/lib/parser.service";
import * as cheerio from "cheerio";

export const fetchLyricsFromLyricsFreak = async (track: {
  artist: string;
  name: string;
}) => {
  try {
    const cleanName = cleanTrackName(track.name);
    const artist = encodeURIComponent(track.artist);
    const name = encodeURIComponent(cleanName);
    const LYRICS_FREAK_URL = `https://www.lyricsfreak.com/search.php?q=${artist}%20${name}`;

    const { data: searchHtml } = await axios.get(LYRICS_FREAK_URL);

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
