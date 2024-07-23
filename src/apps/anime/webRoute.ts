import { Router } from "express";
import { Home, Search, Completed, OnGoing, getRecently, getLiked } from "./webController";

const route = Router();
route.get("/", Home);
route.get("/search", Search);
route.get("/complete", Completed);
route.get("/ongoing", OnGoing);
route.get("/recently", getRecently);
route.get("/liked", getLiked);

export default route;
