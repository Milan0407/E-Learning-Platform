const express = require('express');
const router = express.Router(); // This line was missing
const {
    createCourse,
    addLessonToCourse,
    getAllCourses,
    getCourseById,
    enrollInCourse
} = require('../controllers/courseController');
const { protect, isTeacher, isStudent } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// @route   GET api/courses
// @desc    Get all courses for the platform
// @access  Public
router.get('/', getAllCourses);

// @route   GET api/courses/:id
// @desc    Get a single course by ID
// @access  Private
router.get('/:id', protect, getCourseById);

// @route   POST api/courses
// @desc    Create a new course
// @access  Private (Teacher)
router.post('/', protect, isTeacher, createCourse);

// @route   POST api/courses/:courseId/lessons
// @desc    Add a video lesson to a course
// @access  Private (Teacher)
router.post('/:courseId/lessons', protect, isTeacher, upload.single('video'), addLessonToCourse);

// @route   POST api/courses/:id/enroll
// @desc    Enroll the logged-in student in a course
// @access  Private (Student)
router.post('/:id/enroll', protect, isStudent, enrollInCourse);

module.exports = router;

