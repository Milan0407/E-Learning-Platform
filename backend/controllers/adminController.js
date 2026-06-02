const Course = require('../models/Course');
const User = require('../models/User');
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcryptjs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const deleteCoursesAndAssets = async (courses) => {
  const courseIds = courses.map(course => course._id);

  for (const course of courses) {
    for (const lesson of course.lessons) {
      if (lesson.publicId) {
        try {
          await cloudinary.uploader.destroy(lesson.publicId, { resource_type: 'video' });
        } catch (cloudErr) {
          console.warn('Cloudinary delete warning:', cloudErr && cloudErr.message ? cloudErr.message : cloudErr);
        }
      }
    }
  }

  if (courseIds.length > 0) {
    await Course.deleteMany({ _id: { $in: courseIds } });
    await User.updateMany(
      { enrolledCourses: { $in: courseIds } },
      { $pull: { enrolledCourses: { $in: courseIds } } }
    );
  }
};

// Get all courses (with teacher info)
const getAllCoursesAdmin = async (req, res) => {
  try {
    const courses = await Course.find().populate('teacher', 'name email').sort({ createdAt: -1 }).lean();
    res.json(courses.map(course => ({
      ...course,
      teacher: course.teacher || {
        _id: null,
        name: 'Unknown Teacher',
        email: null,
        missing: true,
      },
    })));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all teachers for admin view
const getAllTeachersAdmin = async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' })
      .select('name email createdAt')
      .sort({ createdAt: -1 })
      .lean();

    const courseCounts = await Course.aggregate([
      { $match: { teacher: { $in: teachers.map(teacher => teacher._id) } } },
      { $group: { _id: '$teacher', count: { $sum: 1 } } },
    ]);

    const countsByTeacher = new Map(
      courseCounts.map(item => [item._id.toString(), item.count])
    );

    res.json(teachers.map(teacher => ({
      ...teacher,
      courseCount: countsByTeacher.get(teacher._id.toString()) || 0,
    })));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update a teacher's profile
const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const teacher = await User.findOne({ _id: id, role: 'teacher' });
    if (!teacher) return res.status(404).json({ msg: 'Teacher not found' });

    if (!name || !email) return res.status(400).json({ msg: 'Name and email are required' });

    const existing = await User.findOne({ email, _id: { $ne: id } });
    if (existing) return res.status(400).json({ msg: 'Email is already in use' });

    teacher.name = name;
    teacher.email = email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      teacher.password = await bcrypt.hash(password, salt);
    }

    await teacher.save();

    res.json({
      msg: 'Teacher updated',
      teacher: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        role: teacher.role,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a teacher and their courses
const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await User.findOne({ _id: id, role: 'teacher' });
    if (!teacher) return res.status(404).json({ msg: 'Teacher not found' });

    const courses = await Course.find({ teacher: id });
    await deleteCoursesAndAssets(courses);
    await User.findByIdAndDelete(id);

    res.json({ msg: 'Teacher and associated courses deleted' });
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

    await deleteCoursesAndAssets([course]);

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
  getAllTeachersAdmin,
  updateTeacher,
  deleteTeacher,
  deleteLesson,
  deleteCourse,
  createUser,
};
