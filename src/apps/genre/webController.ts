import { Request, Response } from "express";
import { getAnimeListByGenre } from "./repo";

export async function getByGenre(req: Request, res: Response) {
  try {
    const { genre } = req.params;
    const { page } = req.query;
    const genrePage = await getAnimeListByGenre(
      genre as string,
      parseInt(page as string)
    );
    if (genrePage.maxPage === -1) {
      return res.redirect(`/`);
    }
    res.render("pages/genre", {
      meta: {
        page: page ? parseInt(page as string) : 1,
        lastPage: genrePage.maxPage,
        beforeLast: genrePage.maxPage - 1,
        pages: genPages(parseInt(page as string), genrePage.maxPage),
      },
      genre,
      data: genrePage.animeList,
    });
  } catch (err) {
    res.render("pages/error", { message: err as string });
  }
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
