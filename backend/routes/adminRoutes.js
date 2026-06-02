const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/authMiddleware');
const {
  getAllCoursesAdmin,
  getAllTeachersAdmin,
  updateTeacher,
  deleteTeacher,
  deleteLesson,
  deleteCourse,
  createUser
} = require('../controllers/adminController');

// Get all courses (admin view)
router.get('/courses', protect, isAdmin, getAllCoursesAdmin);

// Get all teachers (admin view)
router.get('/teachers', protect, isAdmin, getAllTeachersAdmin);

// Update a teacher
router.put('/teachers/:id', protect, isAdmin, updateTeacher);

// Delete a teacher and their courses
router.delete('/teachers/:id', protect, isAdmin, deleteTeacher);

// Delete a lesson
router.delete('/courses/:courseId/lessons/:lessonId', protect, isAdmin, deleteLesson);

// Delete a course
router.delete('/courses/:id', protect, isAdmin, deleteCourse);

// Create a new admin or teacher
router.post('/users', protect, isAdmin, createUser);

module.exports = router;
