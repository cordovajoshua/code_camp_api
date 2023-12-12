import express from 'express';
import {
  addCourse,
  archiveCourse,
  activateCourse,
  enrollCourse,
  getAllCourses,
  getActiveCourses,
  getUserCourses,
  getCourseById,
} from '../controllers/courseController.js';
import { authenticateUser, authorizeUser } from '../middleware/auth.js';

const router = express.Router();

router.post('/', addCourse);
router.put('/:courseId/archive', archiveCourse);
router.put('/:courseId/activate', activateCourse);
router.post('/:courseId/enroll', authenticateUser, enrollCourse);
router.get('/', getActiveCourses);
router.get('/:courseId', getCourseById);
router.get('/all', authenticateUser, authorizeUser, getAllCourses);
router.get('/mycourses', authenticateUser, getUserCourses);

export default router;
