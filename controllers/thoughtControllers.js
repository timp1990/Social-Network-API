const { User, Thought } = require('../models');

// Get all thoughts
function getThoughts(req, res) {
    Thoughts.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err))
}

module.exports = { getThoughts }