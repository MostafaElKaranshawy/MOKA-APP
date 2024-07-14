import express from 'express';

// import user routers
import signIn from './routers/userManagement/signIn.mjs';
import signUp from './routers/userManagement/signUp.mjs';

// import posts routers
import createPost from './routers/postManagement/createPost.mjs';
import deletePost from './routers/postManagement/deletePost.mjs';
import updatePost from './routers/postManagement/updatePost.mjs';
import createComment from './routers/postManagement/createComment.mjs';
import updateComment from './routers/postManagement/updateComment.mjs';
import deleteComment from './routers/postManagement/deleteComment.mjs';

const app  = express();
app.use(express.json());

// user routers
app.use(signIn);
app.use(signUp);

// posts routers
app.use(createPost);
app.use(deletePost);
app.use(updatePost);
app.use(createComment);
app.use(updateComment);
app.use(deleteComment);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});