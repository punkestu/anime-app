import { Request, Response } from "express";
import {
  getCompleteAnime,
  getHomeAnime,
  getOnGoingAnime,
  searchAnime,
} from "./repo";
import { ListAnimeResponse, HomeResponse, SearchAnimeResponse } from "./model";
import { HttpStatusCode } from "axios";

export async function getHomeAnimeC(req: Request, res: Response) {
  try {
    const buffer = await getHomeAnime();
    res.json({
      meta: {
        on_going_count: buffer.on_going.length,
        complete_count: buffer.complete.length,
      },
      data: buffer,
    } as HomeResponse);
  } catch (err) {
    res.status(HttpStatusCode.InternalServerError).send(err);
  }
}

export async function getCompleteAnimeC(req: Request, res: Response) {
  try {
    const page = parseInt((req.query.page as string) || "1");
    const buffer = await getCompleteAnime(page);
    res.json({
      meta: {
        count: buffer.animeList.length,
        page: page ? parseInt(page.toString()) : 1,
        lastPage: buffer.lastPage || -1,
      },
      data: buffer.animeList,
    } as ListAnimeResponse);
  } catch (err) {
    res.status(HttpStatusCode.InternalServerError).send(err);
  }
}

export async function getOnGoingAnimeC(req: Request, res: Response) {
  try {
    const page = parseInt((req.query.page as string) || "1");
    const buffer = await getOnGoingAnime(page);
    res.json({
      meta: {
        count: buffer.animeList.length,
        page: page ? parseInt(page.toString()) : 1,
        lastPage: buffer.lastPage || -1,
      },
      data: buffer.animeList,
    } as ListAnimeResponse);
  } catch (err) {
    res.status(HttpStatusCode.InternalServerError).send(err);
  }
}

export async function searchAnimeC(req: Request, res: Response) {
  try {
    const query = req.query.q as string;
    const buffer = await searchAnime(query);
    res.json({
      meta: {
        count: buffer.length,
        query,
      },
      data: buffer,
    } as SearchAnimeResponse);
  } catch (err) {
    res.status(HttpStatusCode.InternalServerError).send(err);
  }
}
