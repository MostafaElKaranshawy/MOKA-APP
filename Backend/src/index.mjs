import express from 'express';
import cors from 'cors';
import { orm } from './config/orm.mjs';


import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app  = express();
app.use(express.json());
app.use(cors());

import authRouter from './routers/authRouter.mjs';
import CheckUser from './middleWares/checkUser.mjs';
import postRouter from './routers/postRouter.mjs';
import commentRouter from './routers/commentRouter.mjs';
import likeRouter from './routers/likeRouter.mjs';
import friendShipRouter from './routers/friendShipRouter.mjs';
import userRouter from './routers/userRouter.mjs';

app.get('/uploads/:filename', (req, res) => {    
    const filePath = path.join(__dirname, '../uploads', req.params.filename);
    console.log(filePath);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('File not found');
        }
    });
})

app.use(authRouter);
app.use(CheckUser);
app.use(postRouter);
app.use(commentRouter);
app.use(likeRouter);
app.use(friendShipRouter);
app.use(userRouter);

Object.values(orm.models).forEach((model) => {
    if (model.associate) {
      model.associate(orm.models); // Pass the models object to each associate method
    }
});


const PORT = 4000;
import http from 'http';
const server = http.createServer(app)
import {setWss} from './config/wss.mjs';
setWss(server);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Create WebSocket server

orm.sync().then(() => {
    console.log('Database synchronized');
});
