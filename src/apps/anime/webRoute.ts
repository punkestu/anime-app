import { Router } from "express";
import { Home } from "./webController";

const route = Router();
route.get("/", Home);

export default route;
