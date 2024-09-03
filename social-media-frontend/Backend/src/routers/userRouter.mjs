import express from 'express';
import UserController from '../controllers/userController.mjs';
import upload from '../middleWares/photoHandler.mjs'
const userRouter = express.Router();

// Get User Profile
userRouter.patch('/user/profile',UserController.editUserProfile);
userRouter.get('/:userName/profile',UserController.getUserProfile);
userRouter.get('/users/search',UserController.searchUsers);

userRouter.post('/user/profilePhoto', upload.single('profilePhoto'), UserController.uploadProfilePhoto);

export default userRouter;
