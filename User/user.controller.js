let Users = require('./user.model');
let bcrypt = require('bcrypt');
const config = require('../config');
let _ = require('lodash');

let UserController = {

    createUser: (req, res, next) => {
        let user = new Users({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: req.body.password,
        });

        user.save((err, result) => {
            if (err) return res.send(500, err.message)
            res.send(201, result);
        })
    },

    getAllUsers: (req, res, next) => {
        Users.find({}, (err, result) => {
            if (err) res.send(500, 'Some error occured' + err.message)
            res.send(200, result)
        })
    },

    getUser: (req, res, next) => {
        Users.find({ _id: req.query.id }, (err, result) => {
            if (err) res.send(500, 'Some error occured' + err.message)
            res.send(200, result)
        })
    },

    verifyUser: (req, res, next) => {

        Users.find({ email: req.body.email }, (err, result) => {
            if (err) return res.send(401, 'Some error occured ' + err.message)
            if (_.isEmpty(result))
                return res.send(401, "email not registered!");
            if (bcrypt.compareSync(req.body.password, result[0].password))
                return res.send(result);
            else
                res.send(401, 'Incorrect Password!');
        });

    },

    updateUser: (req, res, next) => {
        req.body.user.password = bcrypt.hashSync(req.body.user.password, config.saltRounds)
        Users.findOneAndUpdate({ _id: req.body._id }, { $set: req.body.user }, { new: true }, (err, result) => {
            if (err) return res.send(500, err.message)
            res.send(200, result)
        })
    },

    updatePassword: (req, res, next) => {
        req.body.user.password = bcrypt.hashSync(req.body.user.password, config.saltRounds)
        Users.findOneAndUpdate({ _id: req.body._id }, { $set: req.body.user }, (err, result) => {
            if (err) return res.send(500, err.message)
            res.send(200, result)
        })
    }

}

module.exports = UserController;