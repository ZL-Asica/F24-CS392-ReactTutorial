import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Banner from './Banner';
import TermPage from './TermPage';
import CourseFormWrapper from './CourseFormWrapper';
import { useDbData, useProfile } from '../utilities/firebase';
// import { useJsonQuery } from '../utilities/fetch';

const Main = () => {
  // const url = 'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php';
  // const [schedule, isLoading, error] = useJsonQuery(url);
  const [schedule, error] = useDbData('/');
  const [profile, profileError] = useProfile();

  if (error) return <h1>Error loading course data: {`${error}`}</h1>;
  // if (isLoading) return <h1>Loading course data...</h1>;
  if (!schedule) return <h1>Loading course data...</h1>;

  return (
    <BrowserRouter>
      <Banner title={schedule.title} />
      <Routes>
        <Route path="/" element={<TermPage courses={schedule.courses} profile={profile} />} />
        <Route path="/edit/:courseId" element={<CourseFormWrapper courses={schedule.courses} profile={profile} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Main;
