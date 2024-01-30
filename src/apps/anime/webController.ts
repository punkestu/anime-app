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
    res.render("pages/home", { buffer });
  } catch (err: any) {
    res.render("pages/error", { message: err as string });
  }
}

export async function Search(req: Request, res: Response) {
  try {
    const query = req.query.q as string;
    const buffer = await searchAnime(query);
    res.render("pages/search", {
      meta: {
        count: buffer.length,
        query,
      },
      data: buffer,
    });
  } catch (err) {
    res.render("pages/error", { message: err as string });
  }
}

export async function Completed(req: Request, res: Response) {
  try {
    const page = parseInt((req.query.page as string) || "1");
    const buffer = await getCompleteAnime(page);
    if (buffer.lastPage === -1) {
      return res.redirect(`/`);
    }
    let pages: number[] = genPages(page, buffer.lastPage);
    res.render("pages/completed", {
      meta: {
        page,
        lastPage: buffer.lastPage,
        beforeLast: buffer.lastPage - 1,
        pages,
      },
      data: buffer.animeList,
    });
  } catch (err) {
    res.render("pages/error", { message: err as string });
  }
}

export async function OnGoing(req: Request, res: Response) {
  try {
    const page = parseInt((req.query.page as string) || "1");
    const buffer = await getOnGoingAnime(page);
    if (buffer.lastPage === -1) {
      return res.redirect(`/`);
    }
    let pages: number[] = genPages(page, buffer.lastPage);
    res.render("pages/ongoing", {
      meta: {
        page: page <= buffer.lastPage ? page : buffer.lastPage,
        lastPage: buffer.lastPage,
        beforeLast: buffer.lastPage - 1,
        pages,
      },
      data: buffer.animeList,
    });
  } catch (err) {
    res.render("pages/error", { message: err as string });
  }
}

export function getRecently(req: Request, res: Response) {
  res.render("pages/recently");
}

function genPages(page: number, lastPage: number) {
  if (lastPage > 12) {
    if (page <= 10 || page === lastPage) {
      return Array.from({ length: 9 }, (_, i) => i + 2);
    } else if (page < lastPage - 1) {
      return Array.from({ length: 7 }, (_, i) => i + 2);
    } else if (page == lastPage - 1) {
      return Array.from({ length: 8 }, (_, i) => i + 2);
    }
  }
  return Array.from({ length: lastPage - 2 }, (_, i) => i + 2);
}
