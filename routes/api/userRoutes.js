const router = require('express').Router();
const { getUsers, createUser, getSingleUser, updateUser, deleteUser, addFriend, deleteFriend } = require('../../controllers/userControllers.js');

// /api/users
router.route('/')
    .get(getUsers)
    .post(createUser)

// /api/users/:userId
router.route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

router.route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;
