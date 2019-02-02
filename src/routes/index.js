import {Router} from 'express';
import {index} from '../controller'

export default () => {
    const routes = Router();
    routes.get('/',
        (req, res) => index(req,res)
    );

    return routes;
}