const UserController = require('./user.controller');
const Router = require('restify-router').Router;
const UserRouter = new Router();

module.exports = UserRouter;

//get user by id -- send Id in querystring
UserRouter.get('/', UserController.getUser);

//send user data as per user model format in body
UserRouter.post('/', UserController.createUser);

//send user credentials in user model format body
UserRouter.post('/login', UserController.verifyUser);

//send update json in body's user parameter
UserRouter.put('/', UserController.updateUser);




