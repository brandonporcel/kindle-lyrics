// "use server";

// const GENIUS_SONG_URI = "https://api.genius.com";

export const getRelatedSearch = async ({ prompt }: { prompt: string }) => {
  return [
    {
      index: "album",
      type: "album",
      result: {
        annotation_count: 0,
        api_path: "",
        artist_names: "",
        full_title: "AD HONOREM, Vol. 1 - EP" + prompt,
        header_image_thumbnail_url: "",
        header_image_url: "",
        id: 1,
        lyrics_owner_id: 0,
        lyrics_state: "",
        path: "",
        pyongs_count: 0,
        relationships_index_url: "",
        release_date_for_display: "",
        release_date_with_abbreviated_month_for_display: "",
        song_art_image_thumbnail_url: "",
        song_art_image_url: "",
        title: "AD HONOREM, Vol. 1 - EP",
        title_with_featured: "",
        url: "",
        primary_artist: {
          id: 1,
          image_url: "",
          name: "Dillom & MECHAYRXMEO",
          url: "https://www.last.fm/music/Dillom+&+MECHAYRXMEO/AD+HONOREM,+Vol.+1+-+EP",
        },
      },
    },
    {
      index: "album",
      type: "album",
      result: {
        annotation_count: 0,
        api_path: "",
        artist_names: "",
        full_title: "AD HONOREM, Vol. 1 - EP",
        header_image_thumbnail_url: "",
        header_image_url: "",
        id: 2,
        lyrics_owner_id: 0,
        lyrics_state: "",
        path: "",
        pyongs_count: 0,
        relationships_index_url: "",
        release_date_for_display: "",
        release_date_with_abbreviated_month_for_display: "",
        song_art_image_thumbnail_url: "",
        song_art_image_url: "",
        title: "AD HONOREM, Vol. 1 - EP",
        title_with_featured: "",
        url: "",
        primary_artist: {
          id: 2,
          image_url: "",
          name: "Dillom & Ill Quentin",
          url: "https://www.last.fm/music/Dillom+&+Ill+Quentin/AD+HONOREM,+Vol.+1+-+EP",
        },
      },
    },
    {
      index: "album",
      type: "album",
      result: {
        annotation_count: 0,
        api_path: "",
        artist_names: "",
        full_title: "AD HONOREM, Vol. 1 - EP",
        header_image_thumbnail_url:
          "https://lastfm.freetls.fastly.net/i/u/174s/65f2016ee12e6e27d954392611784d82.png",
        header_image_url: "",
        id: 0,
        lyrics_owner_id: 0,
        lyrics_state: "",
        path: "",
        pyongs_count: 0,
        relationships_index_url: "",
        release_date_for_display: "",
        release_date_with_abbreviated_month_for_display: "",
        song_art_image_thumbnail_url: "",
        song_art_image_url: "",
        title: "AD HONOREM, Vol. 1 - EP",
        title_with_featured: "",
        url: "",
        primary_artist: {
          id: 0,
          image_url:
            "https://lastfm.freetls.fastly.net/i/u/174s/65f2016ee12e6e27d954392611784d82.png",
          name: "Dillom",
          url: "https://www.last.fm/music/Dillom/AD+HONOREM,+Vol.+1+-+EP",
        },
      },
    },
  ];
};

// export const getRelatedSearch = async ({
//   prompt,
//   includeAlbums,
// }: {
//   prompt: string;
//   includeAlbums: boolean;
// }): Promise<any[]> => {
//   try {
//     const promptParam = prompt.toLocaleLowerCase().trim();

//     const url = `${GENIUS_SONG_URI}/search`;

//     const accessToken =
//       import.meta.env.GENIUS_ACCESS_TOKEN ??
//       import.meta.env.PUBLIC_GENIUS_ACCESS_TOKEN;

//     const params = {
//       q: promptParam,
//       access_token: accessToken,
//     };

//     let parsedRelatedAlbums: HitsEntity[] = [];
//     if (includeAlbums) {
//       const res = await getRelatedSearchAlbums(promptParam);
//       const parsedRelatedResponse = parseMusicSuggestions(res);
//       parsedRelatedAlbums = orderByFeaturings(parsedRelatedResponse);
//     }

//     const { data }: { data: GeniusSearchResponse } = await axios.get(url, {
//       params,
//       headers: {
//         Accept: "application/json",
//       },
//     });

//     if (data.response.hits) {
//       return parsedRelatedAlbums.concat(data.response.hits);
//     }
//     return [];
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };
