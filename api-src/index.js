import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import xhub from 'express-x-hub';
import githubAuth from 'github-auth';
import path from 'path';

import {APISecret, clientID, clientSecret, orgName} from '../.n00brc';

// eslint-disable-next-line no-unused-vars
import N00b from './models/N00b';
import routes from './routes/N00b.js';

mongoose.connect('mongodb://localhost/N00bdb');

const app = express();
const gh = githubAuth(clientID, clientSecret, {
  organization: orgName,
  autoLogin: true,
  hideAuthInternals: true
});
const index = path.join(__dirname,'../www/build','index.html');
const indexDir = path.join(__dirname,'../www/build');


app.use(xhub({ secret: APISecret }));
app.use(gh.authenticate);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/n00b/ghlogin', gh.login);

app.all('*', (req, res, next) => {
  if (!req.github || !req.github.authenticated)
    return res.redirect('/n00b/ghlogin');
  next();
});

routes(app);

app.use(express.static(indexDir));

app.get('*', (req, res) => {
  res.sendFile(index);
});

app.listen(5000);
