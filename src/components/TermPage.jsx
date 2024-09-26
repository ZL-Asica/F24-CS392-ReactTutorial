import React, { useState } from 'react';
import TermSelector from './TermSelector';
import CourseList from './CourseList';
import ScheduleModal from './ScheduleModal';

const TermPage = ({ courses }) => {
  const [selectedTerm, setSelectedTerm] = useState('Fall');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [showSchedule, setShowSchedule] = useState(false);

  const toggleSelected = (key) => {
    setSelectedCourses(selectedCourses.includes(key)
      ? selectedCourses.filter(courseKey => courseKey !== key)
      : [...selectedCourses, key]
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <TermSelector selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} />
        <button className="btn btn-outline-primary" onClick={() => setShowSchedule(true)}>
          Course Plan
        </button>
      </div>
      <ScheduleModal
        courses={courses}
        selected={selectedCourses}
        toggleModal={() => setShowSchedule(false)}
        show={showSchedule}
      />
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
