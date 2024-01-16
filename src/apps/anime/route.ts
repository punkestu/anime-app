import {getHomeAnimeC} from "./controller";
import {Router} from "express";

const route = Router();
route.get("/", getHomeAnimeC);

export default route;