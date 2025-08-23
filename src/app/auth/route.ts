import express from 'express';
import controllers from './controllers.js';

const route = express.Router();
    const rootSigninRoute = express.Router();
        const defaultSigninRoute = express.Router();
    const rootLoginRoute = express.Router();
        const defaultLogingRoute = express.Router();
        const resetPasswordRoute = express.Router();
        const changePasswordRoute = express.Router();


// login routes

route.use("/login", rootLoginRoute);

rootLoginRoute.use("/", defaultLogingRoute);
rootLoginRoute.use("/reset-password", resetPasswordRoute);
rootLoginRoute.use("/change-password", changePasswordRoute);

defaultLogingRoute.post("/", controllers.POST_LOGIN);
resetPasswordRoute.post("/", controllers.POST_RESET_PASS);
changePasswordRoute.post("/", controllers.POST_CHANGE_PASS);

// sign-in routes

route.use("/sign-in", rootSigninRoute);

rootSigninRoute.use("/", defaultSigninRoute);

defaultSigninRoute.post("/", controllers.POST_SIGNIN);