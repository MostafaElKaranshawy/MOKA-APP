import express from 'express';
import UserController from '../controllers/userController.mjs';

const userRouter = express.Router();

// Get User Profile
userRouter.patch('/user/profile',UserController.editUserProfile);
userRouter.get('/:userName/profile',UserController.getUserProfile);
// userRouter.get('/:userName/profile',UserController.getOtherUserProfile);
export default userRouter;
