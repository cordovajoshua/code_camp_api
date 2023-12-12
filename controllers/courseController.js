import Course from '../models/courseModel.js';
import User from '../models/userModel.js';

const addCourse = async (req, res) => {
  try {
    const { name, description, about, language } = req.body;

    const newCourse = new Course({
      name,
      description,
      about,
      language,
    });

    await newCourse.save();
    res.status(201).json({ message: 'Course added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});

    if (courses.length > 0) {
      res.status(200).json(courses);
    } else {
      res.status(200).json({ message: 'No courses found' });
    }
  } catch (error) {
    res.status(500).json({ message: message.error });
  }
};

const getActiveCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true });

    if (courses.length > 0) {
      res.status(200).json(courses);
    } else {
      res.status(200).json({ message: 'No courses found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const archiveCourse = async (req, res) => {
  const { courseId } = req.params;

  const course = await Course.findById(courseId);
  course.isActive = false;
  const updatedCourse = await course.save();
  res.status(200).json(updatedCourse);
};

const activateCourse = async (req, res) => {
  const { courseId } = req.params;

  const course = await Course.findById(courseId);
  course.isActive = true;
  const updatedCourse = await course.save();
  res.status(200).json(updatedCourse);
};

const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { userId } = req.user;
    const course = await Course.findById(courseId);
    const user = await User.findById(userId);
    // Check if the user is already enrolled
    const isEnrolled = await Course.findOne({
      _id: courseId,
      'enrollees.userId': userId,
    });
    if (isEnrolled) {
      res.status(400).json({ message: 'User is already enrolled' });
    } else {
      // add user the enrollees array
      course.enrollees.push({ userId });
      // increment no of enrollees
      course.noOfEnrollees += 1;
      user.courses.push({ courseId });
      await course.save();
      await user.save();
      res.status(201).json({ message: 'User enrolled successfully' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getUserCourses = async (req, res) => {
  try {
    const { userId } = req.user;

    const courses = await Course.find({ 'enrollees.userId': userId });
    if (courses.length > 0) {
      res.status(200).json(courses);
    } else {
      res.status(200).json({ message: 'No courses found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (course) {
      res.status(200).json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  addCourse,
  archiveCourse,
  activateCourse,
  enrollCourse,
  getAllCourses,
  getActiveCourses,
  getUserCourses,
  getCourseById,
};
