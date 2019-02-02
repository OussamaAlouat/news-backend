import express from 'express';
import bodyParser from 'body-parser';
import configuration from './config';

const app = express();

//CONFIG ---------------
const config = configuration(app);
app.use(bodyParser());
