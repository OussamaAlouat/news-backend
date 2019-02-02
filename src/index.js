import express from 'express';
import bodyParser from 'body-parser';
import configuration from './config';
import routes from './routes';

const app = express();

//CONFIG ---------------
const config = configuration(app);
app.use(bodyParser());

//ROUTES----------------

app.use('/', routes());

const server = app.listen(process.env.PORT || config.port, () => {
    const listeningPort = process.env.PORT || config.port;
    console.log('Server listening on port ' + listeningPort);
});

export {app, server}