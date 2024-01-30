import { Request, Response } from "express";
import { watchAnime } from "./repo";

export async function watchAnimeC(req: Request, res: Response) {
  try {
    const episodeDetail = await watchAnime(req.params.id);
    res.render("pages/watch", { ...episodeDetail });
  } catch (err) {
    res.render("pages/error", { message: err as string });
  }
}
