import {Request, Response} from "express";
import {getHomeAnime} from "./repo";
import {CacheI, HomeResponse} from "./model";
import {HttpStatusCode} from "axios";

let lastRefresh: Date | null;
const cache: CacheI = {
    home: {
        lastRefresh: null,
        data: {
            complete: [],
            on_going: []
        }
    }
}

export async function getHomeAnimeC(req: Request, res: Response) {
    try {
        if (isRefreshTime()) {
            cache.home.data = await getHomeAnime();
        }
        res.json({
            meta: {
                on_going_count: cache.home.data.on_going.length,
                complete_count: cache.home.data.complete.length,
            },
            data: cache.home.data
        } as HomeResponse);
    } catch (err) {
        res.status(HttpStatusCode.InternalServerError).send(err);
    }
}

function isRefreshTime(): boolean {
    if (!lastRefresh) {
        lastRefresh = new Date();
        return true;
    }
    const diff = Math.ceil(Math.abs(new Date().getTime() - lastRefresh.getTime()) / (1000 * 60 * 60));
    return diff >= 6;
}