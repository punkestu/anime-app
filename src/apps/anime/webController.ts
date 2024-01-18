import { Request, Response } from "express";
import { getHomeAnime, searchAnime } from "./repo";

export async function Home(_: Request, res: Response) {
  try {
    const buffer = await getHomeAnime();
    res.render("home", { buffer });
  } catch (err: any) {
    res.render("error", { message: err as string });
  }
}

export async function Search(req: Request, res: Response) {
  try {
    const query = req.query.q as string;
    const buffer = await searchAnime(query);
    res.render("search", {
      meta: {
        count: buffer.length,
        query,
      },
      data: buffer,
    });
  } catch (err) {
    res.render("error", { message: err as string });
  }
}
