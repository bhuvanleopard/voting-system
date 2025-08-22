import express, {type Express} from 'express';
import route from './app/sign_in/route.js';

const app: Express = express();
app.use(express.json());
console.log("check")
// app.use("/signin", route)
app.listen(3030, ()=>console.log("server started"));
// export default app;