import { Request, Response } from "express";
import { getHomeAnime } from "./repo";

export async function Home(_: Request, res: Response) {
  try {
    const buffer = await getHomeAnime();
    res.render("home", {buffer});
  } catch (err: any) {
    res.render("error", {message : err as string});
  }
}
