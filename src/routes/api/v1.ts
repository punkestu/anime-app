import {Router} from "express";
import AnimeAPI from "../../apps/anime/route";
import DetailAPI from "../../apps/detail/route";

const route = Router();
route.use("/anime", AnimeAPI);
route.use("/detail", DetailAPI);

export default route;