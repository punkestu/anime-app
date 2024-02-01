import {Router} from "express";
import Anime from "../apps/anime/webRoute";
import Detail from "../apps/detail/webRoute";
import Watch from "../apps/episode/webRoute";
import Genre from "../apps/genre/webRoute";
import HtmxComponent from "../apps/htmx-component/webRoute";

const route = Router();
route.use("/", Anime);
route.use("/detail", Detail);
route.use("/watch", Watch);
route.use("/genre", Genre);
route.use("/htmx-component", HtmxComponent);

export default route;