let Router = require('restify-router').Router;
const cardRouter = require('../Cards/card.routes');
const userRouter = require('../User/user.routes');

let Routes = (server) => {

    let router = new Router();

    // router.get('', (req, res, next) => {
    //     res.send('Holaa! Routing worked!');
    // })

    //for card routes the route will be /api/card
    router.add('/card', cardRouter);

    //for user routes the route will be /api/user
    router.add('/user', userRouter);

    //master route will be applied to every router as prefix added current router instance.
    router.applyRoutes(server, '/api');

}

module.exports = Routes;

