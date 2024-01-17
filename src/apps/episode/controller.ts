import { watchAnime } from "./repo";
import { Request, Response } from "express";

export async function watchAnimeC(req: Request, res: Response) {
      res.send(await watchAnime(req.params.id));
}
