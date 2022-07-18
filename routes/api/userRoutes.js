const router = require('express').Router();
const { getUsers, createUser, getSingleUser, updateUser, deleteUser } = require('../../controllers/userControllers.js');

// /api/users
router.route('/')
    .get(getUsers)
    .post(createUser)

// /api/users/:userId
router.route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;
