const Course = require('../models/Course');
const User = require('../models/User');
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcryptjs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all courses (with teacher info)
const getAllCoursesAdmin = async (req, res) => {
  try {
    const courses = await Course.find().populate('teacher', 'name email').sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a lesson from a course (also remove from Cloudinary)
const deleteLesson = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    // Load the course and find the lesson (robust lookup)
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ msg: 'Course not found' });

    // Find lesson by id (support string/objectid)
    const lesson = course.lessons.find(l => l._id.toString() === lessonId.toString());
    if (!lesson) return res.status(404).json({ msg: 'Lesson not found' });

    // Attempt Cloudinary deletion if publicId present
    if (lesson.publicId) {
      try {
        await cloudinary.uploader.destroy(lesson.publicId, { resource_type: 'video' });
      } catch (cloudErr) {
        // Log warning but continue with DB removal
        console.warn('Cloudinary delete warning:', cloudErr && cloudErr.message ? cloudErr.message : cloudErr);
      }
    }

    // Remove lesson using $pull to ensure consistent subdocument removal
    const updated = await Course.findByIdAndUpdate(
      courseId,
      { $pull: { lessons: { _id: lessonId } } },
      { new: true }
    ).populate('teacher', 'name email');

    return res.json(updated || { msg: 'Lesson removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete an entire course (and its lessons from Cloudinary)
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ msg: 'Course not found' });

    // Try deleting lessons from Cloudinary; don't abort on failure
    for (const lesson of course.lessons) {
      if (lesson.publicId) {
        try {
          await cloudinary.uploader.destroy(lesson.publicId, { resource_type: 'video' });
        } catch (cloudErr) {
          console.warn('Cloudinary delete warning:', cloudErr && cloudErr.message ? cloudErr.message : cloudErr);
        }
      }
    }

    // Delete the course document
    await Course.findByIdAndDelete(id);

    return res.json({ msg: 'Course deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create a new user with role admin or teacher
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) return res.status(400).json({ msg: 'Missing fields' });
    if (!['admin', 'teacher'].includes(role)) return res.status(400).json({ msg: 'Invalid role' });

    let existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashed, role });
    await user.save();

    res.status(201).json({ msg: 'User created', user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAllCoursesAdmin,
  deleteLesson,
  deleteCourse,
  createUser,
};
