import { AnimeDetail, Episode } from "./model";
import {
  getAnimeDetail as getAnimeDetailKV,
  setAnimeDetail as setAnimeDetailKV,
} from "./kv";

import { getAnimeDetail as getAnimeDetailRepo } from "./repo";

export async function getAnimeDetail(id: string): Promise<AnimeDetail> {
  const animeData = await getAnimeDetailKV(id);
  if (animeData) return animeData;
  const newAnime = await getAnimeDetailRepo(id);
  setAnimeDetailKV(newAnime).then();
  return newAnime;
}
