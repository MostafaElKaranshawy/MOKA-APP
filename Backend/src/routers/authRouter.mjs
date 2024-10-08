import express from 'express';
import AuthController from '../controllers/authController.mjs';
import AuthValidator from '../middleWares/authValidation.mjs';
import checkUser from '../middleWares/checkUser.mjs'
const authRouter = express.Router();

authRouter.post(
    '/auth/signUp',
    AuthValidator.emailValidation,
    AuthValidator.passwordValidation,
    AuthValidator.nameValidation,
    AuthValidator.userNameValidation,
    AuthValidator.validate,
    AuthController.signUp
);

authRouter.post(
    '/auth/signIn',
    // AuthValidator.emailValidation,
    // AuthValidator.passwordValidation,
    // AuthValidator.validate,
    AuthController.signIn
);
authRouter.delete('/auth/signout', checkUser,AuthController.signOut);

export default authRouter;
