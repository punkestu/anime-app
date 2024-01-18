import { Router } from "express";
import { Home, Search, Completed } from "./webController";

const route = Router();
route.get("/", Home);
route.get("/search", Search);
route.get("/complete", Completed);

export default route;
