import {Router} from "express";
import Anime from "../apps/anime/webRoute";
import Detail from "../apps/detail/webRoute";
import Watch from "../apps/episode/webRoute";

const route = Router();
route.use("/", Anime);
route.use("/detail", Detail);
route.use("/watch", Watch);

export default route;