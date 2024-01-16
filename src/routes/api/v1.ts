import {Router} from "express";
import AnimeAPI from "../../apps/anime/route";

const route = Router();
route.use("/anime", AnimeAPI);

export default route;