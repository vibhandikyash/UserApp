let Cards = require('./card.model');
const mongoose = require('mongoose');

let CardController = {

    AddCard: (req, res, next) => {
        let card = new Cards({
            name: req.body.name,
            cardNumber: req.body.cardNumber,
            expiryDate: req.body.expiryDate,
            userId: req.body.userId
        });

        card.save((err, result) => {
            if (err) return res.send(500, err.message)
            res.send(201, result);
        })
    },

    getUserCards: (req, res, next) => {
        console.log(req.query.userId);
        Cards.find({ userId: mongoose.Types.ObjectId(req.query.userId) }, (err, result) => {
            if (err) return res.send(500, err.message)
            res.send(200, result)
        })
    },

    updateCard: (req, res, next) => {
        Cards.findOneAndUpdate({ _id: req.body.card._id }, { $set: req.body.card }, { new: true }, (err, result) => {
            if (err) return res.send(500, err.message)
            res.send(200, result)
        })
    },

    deleteCard: (req, res, next) => {

        Cards.findOneAndUpdate({ _id: req.body.cardid }, { $set: { deleted: true } }, (err, result) => {
            if (err) return res.send(500, err.message)
            res.send(200, result)
        })
    }

}


module.exports = CardController;