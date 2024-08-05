import express from 'express';
import AuthController from '../controllers/authController.mjs';
import AuthValidator from '../middleWares/authValidation.mjs';

const authRouter = express.Router();

authRouter.post(
    '/signUp',
    AuthValidator.emailValidation,
    AuthValidator.passwordValidation,
    AuthValidator.nameValidation,
    AuthValidator.userNameValidation,
    AuthValidator.validate,
    AuthController.signUp
);

authRouter.get(
    '/signIn',
    AuthValidator.emailValidation,
    AuthValidator.passwordValidation,
    AuthValidator.validate,
    AuthController.signIn
);

export default authRouter;
