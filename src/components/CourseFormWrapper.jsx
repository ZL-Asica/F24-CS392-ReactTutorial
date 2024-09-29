import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CourseForm from './CourseForm';

const CourseFormWrapper = ({ courses, profile }) => {
  const { courseId } = useParams(); // Get the courseId from the URL
  const course = courses[courseId];
  const navigate = useNavigate();

  if (!profile.user || !profile.isAdmin || !course) {
    navigate('/');
    return null;
  }

  return <CourseForm course={course} courseId={courseId} />;
};

export default CourseFormWrapper;
