import React from 'react';
import './CourseList.css';

const CourseList = ({ courses }) => {
  return (
    <div className="course-list">
      {Object.entries(courses).map(([key, course]) => (
        <div className="card m-2 p-2" key={key}>
          <div className="card-body">
            <h5 className="card-title">{course.term} CS {course.number}</h5>
            <p className="card-text">{course.title}</p>
            <p className="card-text">{course.meets}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CourseList;
