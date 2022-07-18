const { User, Thought } = require('../models');

// Get all users
function getUsers(req, res) {
    User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err))
}

function createUser(req, res) {
    User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
}

function getSingleUser(req, res) {
    User.findOne({ _id: req.params.id })
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
}

function updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, { username: req.body.username, email: req.body.email }, { new: true })
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
}

function deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.id })
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json(err));
}

module.exports = { getUsers, createUser, getSingleUser, updateUser, deleteUser }