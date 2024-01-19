import { Request, Response } from "express";
import { watchAnime } from "./repo";

export async function watchAnimeC(req: Request, res: Response) {
  try {
    const episodeDetail = await watchAnime(req.params.id);
    res.render("watch", { ...episodeDetail });
  } catch (err) {
    res.render("error", { message: err as string });
  }
}
