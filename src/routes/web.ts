import {Router} from "express";
import Anime from "../apps/anime/webRoute";

const route = Router();
route.use("/", Anime);

export default route;