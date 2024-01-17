import App from "./bin/app";
import dotenv from "dotenv";
dotenv.config();
App.listen(process.env.PORT || 3000, ()=>{
    console.log(`running on :${process.env.PORT || 3000}`);
})