import express from 'express';
import AuthController from '../controllers/authController.mjs';
import AuthValidator from '../middleWares/authValidation.mjs';

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

authRouter.get(
    '/auth/signIn',
    AuthValidator.emailValidation,
    AuthValidator.passwordValidation,
    AuthValidator.validate,
    AuthController.signIn
);

export default authRouter;
