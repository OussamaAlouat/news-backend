import {Router} from 'express';
import {index} from '../controller'
import {postDocument} from "../controller/document";

export default () => {
    const routes = Router();
    routes.get('/',
        (req, res) => index(req, res)
    );

    routes.post('/document',
        postDocument);

    return routes;
}