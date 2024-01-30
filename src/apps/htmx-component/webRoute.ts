import { sendAnimeList } from "./webController";
import { Router } from "express";

const route = Router();
route.post("/animeList", sendAnimeList);

export default route;
