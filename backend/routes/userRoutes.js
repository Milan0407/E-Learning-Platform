const express = require('express');
const router = express.Router();
const { getTeacherCourses, getEnrolledCourses } = require('../controllers/userController');
const { protect, isTeacher, isStudent } = require('../middleware/authMiddleware');

// Route for teachers
router.get('/teacher/courses', protect, isTeacher, getTeacherCourses);

// New route for students
router.get('/student/courses', protect, isStudent, getEnrolledCourses);

module.exports = router;

