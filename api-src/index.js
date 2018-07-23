import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

// eslint-disable-next-line no-unused-vars
import N00b from './models/N00b';
import routes from './routes/N00b.js';

mongoose.connect('mongodb://localhost/N00bdb');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes(app);

app.get('/', (req,res) => {
  res.send('Hello World!');
});

app.listen(5000);
