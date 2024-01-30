import kv from "../../utils/kv";
import { Anime, AnimeDetail, AnimeDisplay, Episode } from "./model";

export async function getAnimeDetail(id: string): Promise<AnimeDetail | null> {
  const animeDisplay = await kv.get<AnimeDisplay>(`${id}:display`);
  const animeDetail = await kv.get<Anime>(`${id}:detail`);
  const animeEpisodes = await kv.get<Episode[]>(`${id}:episode`);
  const animeGenres = await kv.get<string[]>(`${id}:genre`);
  if (animeDisplay && animeDetail && animeEpisodes && animeGenres) {
    return new AnimeDetail(
      id,
      animeDisplay.title,
      animeDisplay.thumb,
      animeDetail.synopsis,
      animeDetail.score,
      animeDetail.producer,
      animeEpisodes,
      animeGenres
    );
  }
  return null;
}

export async function setAnimeDetail(anime: AnimeDetail): Promise<void> {
  kv.set<AnimeDisplay>(
    `${anime.id}:display`,
    {
      title: anime.title,
      thumb: anime.thumb,
    },
    { ex: 24 * 60 * 60 }
  );
  kv.set<Anime>(
    `${anime.id}:detail`,
    {
      synopsis: anime.synopsis,
      score: anime.score,
      producer: anime.producer,
    },
    { ex: 24 * 60 * 60 }
  );
  kv.set<Episode[]>(`${anime.id}:episode`, anime.episode_list, {
    ex: 24 * 60 * 60,
  });
  kv.set<string[]>(`${anime.id}:genre`, anime.genre, { ex: 24 * 60 * 60 });
}
