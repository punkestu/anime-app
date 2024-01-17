import { Request, Response } from "express";
import { getAnimeDetail } from "./repo";
import { AnimeDetailResponse } from "./model";
import { HttpStatusCode } from "axios";

export async function getAnimeDetailC(req: Request, res: Response) {
  try {
    const buffer = await getAnimeDetail(req.params.id);
    res.json({
      meta: {
        episode_count: buffer.episode_list.length,
      },
      data: buffer,
    } as AnimeDetailResponse);
  } catch (err) {
    res.status(HttpStatusCode.InternalServerError).send(err);
  }
}
