import express, {type Request, type Response} from 'express';
import model_user from './model.js';
// import app from '../../index.js';

const route = express.Router();

route.get("/", (req, res)=>{

    return res.json({msg: "Test"})
});


route.post("/", async(req, res)=>{

    const {email, password, age} = req.body;
    const new_user = new model_user()
    new_user.email = email;
    new_user.password = password;
    new_user.age = age;
    await new_user.save()
    res.json({msg: "successful"})
});

// app.use("/signin", route);
export default route