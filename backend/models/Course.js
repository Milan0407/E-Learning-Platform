const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LessonSchema = new Schema({
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    publicId: { type: String, required: true }
});

const CourseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    teacher: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    lessons: [LessonSchema],
}, { timestamps: true });

// This line is also changed to prevent the same error for the Course model
module.exports = mongoose.models.Course || mongoose.model('Course', CourseSchema);

