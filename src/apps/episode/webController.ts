import { Request, Response } from "express";
import { watchAnime } from "./repo";

export async function watchAnimeC(req: Request, res: Response) {
  try {
    const videoUrl = await watchAnime(req.params.id);
    res.render("watch", { videoUrl });
  } catch (err) {
    res.render("error", { message: err as string });
  }
}
