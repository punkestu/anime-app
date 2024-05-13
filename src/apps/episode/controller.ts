import { watchAnime, getFrame } from "./repo";
import { Request, Response } from "express";

export async function watchAnimeC(req: Request, res: Response) {
  res.send(await watchAnime(req.params.id));
}

export async function changeFrame(req: Request, res: Response) {
  res.send(
    await getFrame(
      `https://otakudesu.stream/desudrive/link/?id=${req.params.id}`
    )
  );
}
