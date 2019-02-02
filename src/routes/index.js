import {Router} from 'express';
import {index} from '../controller'
import {postDocument} from "../controller/document";
import {check} from "express-validator/check";
import {postCheckValidation} from "../middleware/validation";

export default () => {
    const routes = Router();
    routes.get('/',
        (req, res) => index(req, res)
    );

    routes.post('/document',
        [
            check('title').isLength({min: 4}),
            check('description').isLength({min: 5}),
            check('date').exists(),
            check('content').isLength({min: 5}),
            check('author').isLength({min: 5}),
            check('archiveDate').exists({checkNull: false})
        ],
        (req, res, next) => postCheckValidation(req, res, next),
        (req, res) => postDocument(req, res));

    return routes;
}