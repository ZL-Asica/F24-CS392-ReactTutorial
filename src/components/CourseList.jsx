import React from 'react';
import { Link } from 'react-router-dom';
import './CourseList.css';

const CourseList = ({ courses, selected, conflicts, toggleSelected, selectedTerm, profile }) => {
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
            {profile.user && profile.isAdmin && (
              <Link to={`/edit/${key}`} className="btn edit-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </svg>
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
