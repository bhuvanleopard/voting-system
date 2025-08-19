import express from 'express';
import unhandled from "./utils/routeHandler.js"

const app = express();


app.use(unhandled.unhandled);

app.listen(3030, ()=>console.log("server started"));
