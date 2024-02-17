import axios from "axios";
import { Anime, Episode } from "./model";
import cheerio from "cheerio";

export async function getAnimeDetail(id: string): Promise<Anime> {
  return axios
    .get(`${process.env.BASE_URL}anime/${id}`)
    .then((response) => {
      const $ = cheerio.load(response.data);
      return $;
    })
    .then(($) => {
      const detailElement = $(".venser").find(".fotoanime");
      const title = detailElement
        .find(".infozin > .infozingle")
        .find("p")
        .children()
        .eq(0)
        .text()
        .replace("Judul: ", "");
      const thumb = detailElement.find("img").attr("src") || "-";
      const synopsis = $("#venkonten > div.venser > div.fotoanime > div.sinopc")
        .find("p")
        .text();
      const score = detailElement
        .find(".infozin > .infozingle")
        .find("p")
        .children()
        .eq(2)
        .text()
        .replace("Skor: ", "");
      const producer = detailElement
        .find(".infozin > .infozingle")
        .find("p")
        .children()
        .eq(3)
        .text()
        .replace("Produser: ", "");
      const genre_list = detailElement
        .find(".infozin > .infozingle")
        .find("p")
        .children()
        .eq(10)
        .find("span > a")
        .map(
          (_, el) =>
            $(el)
              .attr("href")
              ?.replace(`${process.env.BASE_URL}genres/`, "").slice(0, -1) || "-"
        ).get();
      const episode_list: Episode[] = $(
        "#venkonten > div.venser > div:nth-child(8) > ul > li"
      )
        .map((_, el) => {
          const id = $(el)
          .find("span > a")
          .attr("href")
          ?.replace(`${process.env.BASE_URL}episode/`, "") || "-";
          return {
            id,
            title: $(el).find("span > a").text(),
            link: `/watch/${id}`,
          };
        })
        .get();
      return new Anime(
        id,
        title,
        thumb,
        synopsis,
        parseFloat(score),
        producer,
        episode_list,
        genre_list
      );
    });
}
