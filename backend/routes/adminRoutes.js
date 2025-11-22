const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/authMiddleware');
const { getAllCoursesAdmin, deleteLesson, deleteCourse, createUser } = require('../controllers/adminController');

// Get all courses (admin view)
router.get('/courses', protect, isAdmin, getAllCoursesAdmin);

// Delete a lesson
router.delete('/courses/:courseId/lessons/:lessonId', protect, isAdmin, deleteLesson);

// Delete a course
router.delete('/courses/:id', protect, isAdmin, deleteCourse);

// Create a new admin or teacher
router.post('/users', protect, isAdmin, createUser);

module.exports = router;
