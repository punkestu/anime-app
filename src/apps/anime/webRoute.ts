import { Router } from "express";
import { Home, Search } from "./webController";

const route = Router();
route.get("/", Home);
route.get("/search", Search);

export default route;
