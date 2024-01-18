import { Request, Response } from "express";
import {
  getHomeAnime,
  searchAnime,
  getCompleteAnime,
  getOnGoingAnime,
} from "./repo";

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

export async function Completed(req: Request, res: Response) {
  try {
    const page = parseInt((req.query.page as string) || "1");
    const buffer = await getCompleteAnime(page);
    let pages: number[] = [];
    if (buffer.lastPage > 12) {
      if (page <= 10 || page === buffer.lastPage) {
        pages = Array.from({ length: 9 }, (_, i) => i + 2);
      } else if (page < buffer.lastPage - 1) {
        pages = Array.from({ length: 7 }, (_, i) => i + 2);
      } else if (page == buffer.lastPage - 1) {
        pages = Array.from({ length: 8 }, (_, i) => i + 2);
      }
    }else{
      pages = Array.from({length: buffer.lastPage - 2}, (_, i) => i + 2);
    }
    res.render("completed", {
      meta: {
        page,
        lastPage: buffer.lastPage,
        beforeLast: buffer.lastPage - 1,
        pages,
      },
      data: buffer.animeList,
    });
  } catch (err) {
    res.render("error", { message: err as string });
  }
}
