import App from "./bin/app";
App.listen(process.env.PORT || 3000, ()=>{
    console.log(`running on :${process.env.PORT || 3000}`);
})