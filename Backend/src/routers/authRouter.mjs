import express from 'express';
import { body, validationResult } from 'express-validator';
import AuthController from '../controllers/authController.mjs';

const authRouter = express.Router();

const emailValidation = body('email')
    .isString()
    .notEmpty()
    .withMessage('Email must not be empty')
    .isEmail()
    .withMessage('Must be a valid email');

const passwordValidation = body('password')
    .isString()
    .notEmpty()
    .withMessage('Password must not be empty')
    .isLength({ min: 8, max: 20 })
    .withMessage('Password must be between 8 and 20 characters');

const nameValidation = body('name')
    .isString()
    .notEmpty()
    .withMessage('Name must not be empty')
    .isLength({ min: 5, max: 30 })
    .withMessage('Name must be between 5 and 30 characters');

const userNameValidation = body('username')
    .isString()
    .notEmpty()
    .withMessage('Username must not be empty')
    .isLength({ min: 5, max: 30 })
    .withMessage('Username must be between 5 and 30 characters');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

authRouter.post(
    '/signUp',
    emailValidation,
    passwordValidation,
    nameValidation,
    userNameValidation,
    validate,
    AuthController.signUp
);

authRouter.get(
    '/signIn',
    emailValidation,
    passwordValidation,
    validate,
    AuthController.signIn
);

export default authRouter;
