import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';    // To use 'environment variables', we need to install 'dotenv' => npm i dotenv
import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// Use 'express middleware' to connect 'postRoutes' to our application
// 1st parameter - Setup the starting pad for all the routes inside of the 'posts.js', 2nd parameter - Routes
app.use('/posts', postRoutes);  /* This means every route inside of the 'postRoutes' is going to start with '/posts' 
                                (i.e:- We have to use 'http://localhost:5000/posts', instead of 'http://localhost:5000/') */

// // A 'Landing page' for Deployment
// app.get('/', (req, res) => {
//     res.send('Hello to Memories API');
// });

const CONNECTION_URL = process.env.CONNECTION_URL;

const PORT = process.env.PORT || 5000;

// Connect to our DB using 'mongoose': Parameters - Connection_url, Options (optional)
// Options parameter - These options are not mandatory, but if you don't set them up, you are goint to get some warnings in the console
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }) 
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((err) => console.log(err.message));

// To prevent warnings in the console
mongoose.set('useFindAndModify', false);
