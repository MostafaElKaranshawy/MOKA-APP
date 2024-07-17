import express from 'express';

const app  = express();
app.use(express.json());

import authRouter from './routers/authRouter.mjs';
import postRouter from './routers/postRouter.mjs';
import commentRouter from './routers/commentRouter.mjs';

app.use(authRouter);
app.use(postRouter);
app.use(commentRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});