import express from 'express';

// import user routers
import signIn from './routers/userManagement/signIn.mjs';
import signUp from './routers/userManagement/signUp.mjs';


const app  = express();
app.use(express.json());

// user routers
app.use(signIn);
app.use(signUp);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});