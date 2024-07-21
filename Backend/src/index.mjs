import express from 'express';
import cors from 'cors';

const app  = express();
app.use(express.json());
app.use(cors());
import authRouter from './routers/authRouter.mjs';
import postRouter from './routers/postRouter.mjs';
import commentRouter from './routers/commentRouter.mjs';
import likeRouter from './routers/likeRouter.mjs';
import friendShipRouter from './routers/friendShipRouter.mjs';

app.use(authRouter);
app.use(postRouter);
app.use(commentRouter);
app.use(likeRouter);
app.use(friendShipRouter);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});