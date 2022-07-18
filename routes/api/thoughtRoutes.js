const router = require('express').Router();
const { getThoughts } = require('../../controllers/thoughtControllers.js');

// /api/thoughts
router.route('/').get(getThoughts)

// /api/thoughts/:courseId
// router
//     .route('/:courseId')
//     .get(getSingleCourse)
//     .put(updateCourse)
//     .delete(deleteCourse);

module.exports = router;
