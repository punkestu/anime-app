import {Router} from "express";
import AnimeAPI from "../../apps/anime/route";
import DetailAPI from "../../apps/detail/route";
import EpisodeAPI from "../../apps/episode/route";

const route = Router();
route.use("/anime", AnimeAPI);
route.use("/detail", DetailAPI);
route.use("/watch", EpisodeAPI);

export default route;