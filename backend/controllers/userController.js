const Course = require('../models/Course');
const User = require('../models/User'); // Import User model

const getTeacherCourses = async (req, res) => {
    try {
        const courses = await Course.find({ teacher: req.user.id }).sort({ createdAt: -1 });
        res.json(courses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// New function for getting a student's enrolled courses
const getEnrolledCourses = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate({
            path: 'enrolledCourses',
            populate: {
                path: 'teacher',
                select: 'name'
            }
        });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user.enrolledCourses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    getTeacherCourses,
    getEnrolledCourses
};

