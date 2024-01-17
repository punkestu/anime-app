import { Anime, HomeAnime } from "./model";
import axios from "axios";
import cheerio from "cheerio";

function mapper($: cheerio.Root) {
  return (_: number, el: cheerio.Element) => {
    let episode: number | undefined;
    let uploaded_on: string | undefined;
    let day_updated: string | undefined;
    let score: number | undefined;
    let thumb: string | undefined;
    let link: string | undefined;
    let title: string = "";
    let id: string = "";
    let genre_list:
      | {
          genre_title: string;
          genre_link: string;
          genre_id: string;
        }[]
      | undefined;
    let status: string | undefined;
    $(el)
      .find(".thumb > a")
      .each(function (_, el) {
        title = $(el).find(".thumbz > h2").text();
        thumb = $(el).find(".thumbz > img").attr("src") || undefined;
        link = $(el).attr("href") || undefined;
        if (!link) {
          id = "-";
        } else {
          id = link.replace(`${process.env.BASE_URL}anime/`, "");
        }
      });
    title = title === "" ? $(el).find("h2").text() || "-" : title;
    id =
      id === ""
        ? $(el)
            .find("h2 > a")
            .attr("href")
            ?.replace(`${process.env.BASE_URL}anime/`, "") || "-"
        : id;
    thumb = thumb ? thumb : $(el).find("img").attr("src") || undefined;
    link = link ? link : $(el).find("h2 > a").attr("href") || undefined;
    status = $(el).find(".set").eq(1).text().replace("Status : ", "") || undefined;
    genre_list = $(el)
      .find(".set")
      .find("a")
      .map(function (_, el) {
        return {
          genre_title: $(el).text(),
          genre_link: $(el).attr("href"),
          genre_id: $(el)
            .attr("href")
            ?.replace(`${process.env.BASE_URL}genres/`, ""),
        };
      })
      .get();
    uploaded_on = $(el).find(".newnime").text() || undefined;
    const epsEl = $(el).find(".epz").text().split(" ");
    episode = parseInt(epsEl[2]) || parseInt(epsEl[0]) || undefined;
    score =
      parseFloat($(el).find(".epztipe").text().replace(" ", "")) ||
      parseFloat($(el).find(".set").eq(2).text().replace("Rating : ", "")) ||
      undefined;
    day_updated = $(el).find(".epztipe").text().replace(" ", "");
    genre_list = genre_list.length > 0 ? genre_list : undefined;
    day_updated = parseFloat(day_updated) ? undefined : day_updated;
    day_updated = day_updated === "" ? undefined : day_updated;
    return new Anime(
      title,
      id,
      thumb,
      episode,
      uploaded_on,
      day_updated,
      score,
      link,
      genre_list,
      status
    );
  };
}

export async function getHomeAnime(): Promise<HomeAnime> {
  let home: HomeAnime = {
    on_going: [],
    complete: [],
  };
  if (!process.env.BASE_URL) {
    throw new Error("base url not provided");
  }
  return axios
    .get(process.env.BASE_URL)
    .then((response) => {
      const $ = cheerio.load(response.data);
      return { $: $, element: $(".venz") };
    })
    .then(({ $, element }) => {
      home.on_going = element
        .children()
        .eq(0)
        .find("ul > li")
        .map(mapper($))
        .get();
      return { $, element };
    })
    .then(({ $, element }) => {
      home.complete = element
        .children()
        .eq(1)
        .find("ul > li")
        .map(mapper($))
        .get();
      return home;
    })
    .catch((e) => {
      throw new Error(e.toString());
    });
}

export async function getCompleteAnime(page: number): Promise<Anime[]> {
  if (!process.env.BASE_URL) {
    throw new Error("base url not provided");
  }
  const buffer: Anime[] = await axios
    .get(
      `${process.env.BASE_URL}complete-anime/${page > 1 ? `page/${page}` : ""}`
    )
    .then((response) => {
      const $ = cheerio.load(response.data);
      const element = $(".venz");
      const animeList: Anime[] = element
        .children()
        .eq(0)
        .find("ul > li")
        .map(mapper($))
        .get();
      return animeList;
    })
    .catch((err) => {
      console.log(err.message);
      throw new Error(err.message);
    });
  return buffer;
}

export async function getOnGoingAnime(page: number): Promise<Anime[]> {
  if (!process.env.BASE_URL) {
    throw new Error("base url not provided");
  }
  const buffer: Anime[] = await axios
    .get(
      `${process.env.BASE_URL}ongoing-anime/${page > 1 ? `page/${page}` : ""}`
    )
    .then((response) => {
      const $ = cheerio.load(response.data);
      const element = $(".venz");
      const animeList: Anime[] = element
        .children()
        .eq(0)
        .find("ul > li")
        .map(mapper($))
        .get();
      return animeList;
    })
    .catch((err) => {
      throw new Error(err.message);
    });
  return buffer;
}

export async function searchAnime(query: string): Promise<Anime[]> {
  const buffer: Anime[] = await axios
    .get(`${process.env.BASE_URL}?s=${query}&post_type=anime`)
    .then((response) => {
      const $ = cheerio.load(response.data);
      const element = $(".page");
      const animeList: Anime[] = element.find("ul > li").map(mapper($)).get();
      return animeList;
    })
    .catch((err) => {
      throw new Error(err.message);
    });
  return buffer;
}
