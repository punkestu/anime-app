import {
  getCompleteAnimeC,
  getHomeAnimeC,
  getOnGoingAnimeC,
  searchAnimeC,
} from "./controller";
import { Router } from "express";

const route = Router();
route.get("/", getHomeAnimeC);
route.get("/complete", getCompleteAnimeC);
route.get("/ongoing", getOnGoingAnimeC);
route.get("/search", searchAnimeC);

export default route;
