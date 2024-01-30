import { Request, Response } from "express";

export function sendAnimeList(req: Request, res: Response) {
  const { animeList }: { animeList: string | string[] } = req.body;
  if (!animeList) {
    return res.render("components/animeList", {
      head: "Recently Watch",
      animeList: [],
    });
  }
  const animeListParsed =
    typeof animeList === "string"
      ? [JSON.parse(animeList)]
      : animeList
          .map(
            (anime: string) =>
              JSON.parse(anime) as {
                title: string;
                id: string;
                thumb: string;
              }
          );
  res.render("components/animeList", {
    head: "Recently Watch",
    animeList: animeListParsed.slice(0, 5),
    more: animeListParsed.length > 5,
    url: "/recently",
  });
}
