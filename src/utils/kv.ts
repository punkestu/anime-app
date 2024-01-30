import { config } from "dotenv";
config();
import { kv } from "@vercel/kv";

export default kv;
