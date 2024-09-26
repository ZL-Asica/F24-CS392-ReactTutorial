import React, { useState } from 'react';
import TermSelector from './TermSelector';
import CourseList from './CourseList';

const TermPage = ({ courses }) => {
  const [selectedTerm, setSelectedTerm] = useState('Fall');
  const [selectedCourses, setSelectedCourses] = useState([]);

  const toggleSelected = (key) => {
    setSelectedCourses(selectedCourses.includes(key)
      ? selectedCourses.filter(courseKey => courseKey !== key)
      : [...selectedCourses, key]
    );
  }

  return (
    <div>
      <TermSelector selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} />
      <CourseList
        courses={courses}
        selected={selectedCourses}
        toggleSelected={toggleSelected}
        selectedTerm={selectedTerm}
      />
    </div>
  );
};

export default TermPage;
