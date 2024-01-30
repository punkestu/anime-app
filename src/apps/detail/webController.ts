import { Request, Response } from "express";
import { getAnimeDetail } from "./repo";

export async function DetailAnime(req: Request, res: Response) {
  try {
    const buffer = await getAnimeDetail(req.params.id);
    res.render("pages/detail", { buffer });
  } catch (err) {
    res.render("pages/error", { message: err as string });
  }
}
