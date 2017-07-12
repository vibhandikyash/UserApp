let cardController = require('./card.controller');
const Router = require('restify-router').Router;
const cardRouter = new Router();

module.exports = cardRouter;

cardRouter.get('/', cardController.getUserCards);

cardRouter.post('/', cardController.AddCard);

cardRouter.put('/', cardController.updateCard);

cardRouter.del('/', cardController.deleteCard);


