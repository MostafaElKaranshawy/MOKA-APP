import express from 'express';
import cors from 'cors';
import {orm} from './config/orm.mjs';

const app  = express();
app.use(express.json());
app.use(cors());
import authRouter from './routers/authRouter.mjs';
import CheckUser from './middleWares/checkUser.mjs';
import postRouter from './routers/postRouter.mjs';
import commentRouter from './routers/commentRouter.mjs';
import likeRouter from './routers/likeRouter.mjs';
import friendShipRouter from './routers/friendShipRouter.mjs';

app.use(authRouter);
app.use(CheckUser)
app.use(postRouter);
app.use(commentRouter);
app.use(likeRouter);
app.use(friendShipRouter);

Object.values(orm.models).forEach((model) => {
    if (model.associate) {
      model.associate(orm.models); // Pass the models object to each associate method
    }
});

const PORT = 4000;
orm.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});