import mongoose, { mongo } from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  enrollees: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      enrolledOn: { type: Date, default: new Date() },
    },
  ],
  noOfEnrollees: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
