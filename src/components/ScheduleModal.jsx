import React from 'react';
import './ScheduleModal.css';

const ScheduleModal = ({ courses, selected, toggleModal, show }) => {
  const selectedCourseDetails = selected.map(key => courses[key]);

  return (
    <div
      className={`modal ${show ? 'modal-show' : ''}`}
      tabIndex="-1"
      role="dialog"
      onClick={(evt) => { if (evt.target === evt.currentTarget) toggleModal(); }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Your Course Plan</h5>
            <button type="button" className="btn-close" aria-label="Close" 
              onClick={toggleModal}
            />
          </div>
          <div className="modal-body">
            {selected.length === 0 ? (
              <p>
                No courses selected.
                <br/>
                Please select some courses to view your schedule.
                <br/>
                Just click the class you would like to attend.
              </p>
            ) : (
              <ul>
                {selectedCourseDetails.map((course) => (
                  <li key={course.number}>
                    <strong>{course.term} CS {course.number}</strong>: {course.title} ({course.meets})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;
