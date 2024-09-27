import React from 'react';
import { useNavigate } from 'react-router-dom';

const CourseForm = ({ course }) => {
  const { term, number, title, meets } = course || {};
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="mt-3" onSubmit={handleSubmit}>
      <h2 className='mb-3'>Edit Course - <i><u>{term} CS {number}</u></i></h2>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">Course Title</label>
        <input type="text" className="form-control" id="title" defaultValue={title} />
      </div>

      <div className="mb-3">
        <label htmlFor="meets" className="form-label">Meeting Times</label>
        <input type="text" className="form-control" id="meets" defaultValue={meets} />
      </div>

      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-secondary me-2" onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </form>
  );
};

export default CourseForm;
