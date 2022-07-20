const { User, Thought } = require('../models');

// Get all Thoughts
function getThoughts(req, res) {
    Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err))
}

function createThought(req, res) {
    Thought.create(req.body)
        .then((thought) => {
            return res.json(thought)
        })
        .then((jsonThought) => {
            User.findOneAndUpdate(
                { _id: jsonThought.req.body.userId },
                { $addToSet: { thoughts: res._id } },
                { runValidators: true, new: true }
            )
        })
        .catch((err) => res.status(500).json(err));
}

function deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with that ID' })
                : res.json({ message: 'thought deleted!' }))
        .catch((err) => res.status(500).json(err));
}

function getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
}

function updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { thoughtText: req.body.thoughtText }, { new: true })
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
}

function addReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
    )
        .then((thought) =>
            !thought
                ? res
                    .status(404)
                    .json({ message: 'No thought found with that ID :(' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
}

function deleteReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.body.reactionId } } },
        { runValidators: true, new: true }
    )
        .then((thought) =>
            !thought
                ? res
                    .status(404)
                    .json({ message: 'No thought found with that ID :(' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));

}

module.exports = { getThoughts, createThought, getSingleThought, deleteThought, updateThought, addReaction, deleteReaction }