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

function addFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
    )
        .then((friend) =>
            !friend
                ? res
                    .status(404)
                    .json({ message: 'No friend found with that ID :(' })
                : res.json(friend)
        )
        .catch((err) => res.status(500).json(err));
}

function deleteFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
    )
        .then((friend) =>
            !friend
                ? res
                    .status(404)
                    .json({ message: 'No friend found with that ID :(' })
                : res.json(friend)
        )
        .catch((err) => res.status(500).json(err));
}

module.exports = { getUsers, createUser, getSingleUser, updateUser, deleteUser, addFriend, deleteFriend }