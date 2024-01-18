import { Router } from "express";
import { Home, Search, Completed, OnGoing } from "./webController";

const route = Router();
route.get("/", Home);
route.get("/search", Search);
route.get("/complete", Completed);
route.get("/ongoing", OnGoing);

export default route;
