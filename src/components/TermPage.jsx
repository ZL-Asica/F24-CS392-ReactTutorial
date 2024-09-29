import React, { useState, useEffect } from 'react';
import TermSelector from './TermSelector';
import CourseList from './CourseList';
import ScheduleModal from './ScheduleModal';
import { hasConflict } from '../utilities/timeUtils';

const TermPage = ({ courses, profile }) => {
  const [selectedTerm, setSelectedTerm] = useState('Fall');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [conflictingCourses, setConflictingCourses] = useState([]);
  const [showSchedule, setShowSchedule] = useState(false);

  // Check for conflicts whenever selectedCourses changes
  useEffect(() => {
    const conflicts = [];
    selectedCourses.forEach(selectedKey => {
      Object.entries(courses).forEach(([key, course]) => {
        if (selectedKey !== key &&
            selectedTerm === course.term &&
            hasConflict(courses[selectedKey], course)
           ) {
          conflicts.push(key);
        }
      });
    });
    setConflictingCourses(conflicts);
  }, [selectedCourses, selectedTerm, courses]);

  const toggleSelected = (key) => {
    if (conflictingCourses.includes(key)) return;
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
        conflicts={conflictingCourses}
        toggleSelected={toggleSelected}
        selectedTerm={selectedTerm}
        profile={profile}
      />
    </div>
  );
};

export default TermPage;
