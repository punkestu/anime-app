import { Anime } from "./model";
import axios from "axios";
import cheerio from "cheerio";

export async function getAnimeListByGenre(
  genre: string,
  page: number | undefined
): Promise<{ maxPage: number; animeList: Anime[] }> {
  return axios
    .get(`${process.env.BASE_URL}genres/${genre}/page/${page || 1}`)
    .then((response) => {
      if (response.status !== 200) {
        return { maxPage: 1, animeList: [] };
      }
      const $ = cheerio.load(response.data);
      const element = $(".col-anime");
      const animeList = element
        .map((_, el) => {
          const title = $(el).find(".col-anime-title > a").text();
          const id = $(el)
            .find(".col-anime-title > a")
            .attr("href")
            ?.replace(`${process.env.BASE_URL}anime/`, "");
          const link = id ? `/detail/${id}` : "-";
          const thumb = $(el).find(".col-anime-cover > img").attr("src");
          return {
            title,
            link,
            thumb,
          } as Anime;
        })
        .get() as Anime[];

      const pages = $(".pagenavix").find(".page-numbers:not(.next):not(.prev)");
      const maxPage = parseInt(pages.last().html() || "-1");
      return {
        maxPage,
        animeList,
      };
    });
}
