import Router from "router";

import AuthController from "../controllers/authController.mjs";

const authRouter = Router();

authRouter.post('/signUp', AuthController.signUp);
authRouter.get('/signIn', AuthController.signIn);

export default authRouter;