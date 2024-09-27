import React from 'react';
import './CourseList.css';

const CourseList = ({ courses, selected, conflicts, toggleSelected, selectedTerm }) => {
  const filteredCourses = Object.entries(courses).filter(([key, course]) => course.term === selectedTerm);

  return (
    <div className="course-list">
      {filteredCourses.map(([key, course]) => (
        <div
          className={`card m-2 p-2 shadow ${selected.includes(key) ? 'selected' : ''}
                      ${conflicts.includes(key) ? 'conflict' : ''}`}
          key={key}
          onClick={() => toggleSelected(key)}
        >
          <div className="card-body">
            <h5 className="card-title">{course.term} CS {course.number}</h5>
            <p className="card-text">{course.title}</p>
            <p className="card-text">{course.meets}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
