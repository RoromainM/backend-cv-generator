const UserModel = require('./../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verifyUser } = require('../validator/user');

module.exports = {
    // POST /register Creer un utilisateur
    register: async (req, res) => {
        try {
            verifyUser(req.body);
            const { firstname, lastname, email, password } = req.body;
            const hash = await bcrypt.hash(password, 10);
            const newUser = new UserModel({
                firstname,
                lastname,
                email, // email: email
                password: hash
            });

            newUser.save();
            res.status(201).send({
                id: newUser._id,
                lastname: newUser.lastname,
                firstname: newUser.firstname,
                email: newUser.email
            });
        } catch (error) {
            res.send({
                message: error.message || 'Cannot register User'
            });
        }
    },
};