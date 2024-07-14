import express from 'express';

// import user routers
import signIn from './routers/userManagement/signIn.mjs';
import signUp from './routers/userManagement/signUp.mjs';

// import posts routers
import createPost from './routers/postManagement/createPost.mjs';
import deletePost from './routers/postManagement/deletePost.mjs';
import updatePost from './routers/postManagement/updatePost.mjs';

const app  = express();
app.use(express.json());

// user routers
app.use(signIn);
app.use(signUp);

// posts routers
app.use(createPost);
app.use(deletePost);
app.use(updatePost);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});