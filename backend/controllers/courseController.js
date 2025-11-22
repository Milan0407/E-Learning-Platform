const Course = require('../models/Course');
const User = require('../models/User');
const cloudinary = require('cloudinary').v2;
const fs = require('fs'); // Import the file system module

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- THIS IS THE CORRECTED FUNCTION ---
const addLessonToCourse = async (req, res) => {
    // Check if a file was actually uploaded by multer
    if (!req.file) {
        return res.status(400).json({ msg: 'No video file uploaded.' });
    }

    const { title } = req.body;
    const filePath = req.file.path; // The path to the temporary file

    try {
        const course = await Course.findById(req.params.courseId);
        if (!course) {
            fs.unlinkSync(filePath); // Clean up the temporary file
            return res.status(404).json({ msg: 'Course not found' });
        }

        // Ensure the person uploading is the teacher of the course
        if (course.teacher.toString() !== req.user.id) {
            fs.unlinkSync(filePath); // Clean up
            return res.status(401).json({ msg: 'User not authorized' });
        }
        
        // Upload the file from the temporary path to Cloudinary
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: 'video',
            folder: `gyansetu/courses/${course._id}`
        });
        
        // The upload is done, so we can delete the temporary file
        fs.unlinkSync(filePath);

        const newLesson = {
            title,
            videoUrl: result.secure_url,
            publicId: result.public_id
        };

        course.lessons.push(newLesson);
        await course.save(); // Save the updated course to the database

        // Send the complete, updated course back to the frontend
        res.json(course);

    } catch (err) {
        // If anything fails, delete the temporary file and send a detailed error
        fs.unlinkSync(filePath);
        console.error("Cloudinary Upload Error:", err.message);
        res.status(500).send('Server Error during file processing.');
    }
};


// --- OTHER FUNCTIONS IN THE FILE (ensure they are present) ---

const createCourse = async (req, res) => {
    const { title, description } = req.body;
    try {
        const newCourse = new Course({ title, description, teacher: req.user.id });
        const course = await newCourse.save();
        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('teacher', 'name').sort({ createdAt: -1 });
        res.json(courses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('teacher', 'name');
        if (!course) {
            return res.status(404).json({ msg: 'Course not found' });
        }
        res.json(course);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Course not found' });
        }
        res.status(500).send('Server Error');
    }
};

const enrollInCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        const user = await User.findById(req.user.id);
        if (!course) return res.status(404).json({ msg: 'Course not found' });
        if (user.enrolledCourses.includes(course._id)) return res.status(400).json({ msg: 'User already enrolled' });
        user.enrolledCourses.push(course._id);
        await user.save();
        res.json({ msg: 'Enrollment successful', enrolledCourses: user.enrolledCourses });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


module.exports = {
    createCourse,
    addLessonToCourse,
    getAllCourses,
    getCourseById,
    enrollInCourse
};

