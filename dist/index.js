import express from 'express';
import model_user from './app/sign_in/model.js';
const app = express();

app.use(express.json())
app.post("/user", async (req, res) => {
    const { email, password, age } = req.body;
    const new_user = new model_user();
    new_user.email = email;
    new_user.password = password;
    new_user.age = age;
    await new_user.save();
    res.json({ msg: "successful" });
});
app.listen(3030, () => console.log("server started"));
