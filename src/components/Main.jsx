import React from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Banner from './Banner';
import TermPage from './TermPage';
import CourseForm from './CourseForm';
import { useJsonQuery } from '../utilities/fetch';

// Define a wrapper component to pass course data to CourseForm
const CourseFormWrapper = ({ courses }) => {
  const { courseId } = useParams(); // Get the courseId from the URL
  const course = courses[courseId];

  return <CourseForm course={course} />;
};

const Main = ({ url }) => {
  const [schedule, isLoading, error] = useJsonQuery(url);

  if (error) return <h1>Error loading course data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading course data...</h1>;
  if (!schedule) return <h1>No course data found</h1>;

  return (
    <BrowserRouter>
      <Banner title={schedule.title} />
      <Routes>
        <Route path="/" element={<TermPage courses={schedule.courses} />} />
        <Route path="/edit/:courseId" element={<CourseFormWrapper courses={schedule.courses} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Main;
