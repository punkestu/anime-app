import {Router} from "express";
import Anime from "../apps/anime/webRoute";
import Detail from "../apps/detail/webRoute";

const route = Router();
route.use("/", Anime);
route.use("/detail", Detail);

export default route;