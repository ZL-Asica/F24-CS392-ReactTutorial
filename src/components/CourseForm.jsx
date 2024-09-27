import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '../utilities/useFormData';

const CourseForm = ({ course }) => {
  const { term, number, title, meets } = course || {};
  const navigate = useNavigate();

  const [state, change] = useFormData({ title, meets });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="mt-3" onSubmit={handleSubmit} noValidate>
      <h2 className='mb-3'>Edit Course - <i><u>{term} CS {number}</u></i></h2>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">Course Title</label>
        <input
          type="text"
          className={`form-control ${state.errors.title ? 'is-invalid' : 'is-valid'}`}
          id="title"
          value={state.values.title}
          onChange={change}
          required
        />
        <div className="invalid-feedback">{state.errors.title}</div>
      </div>

      <div className="mb-3">
        <label htmlFor="meets" className="form-label">Meeting Times</label>
        <input
          type="text"
          className={`form-control ${state.errors.meets ? 'is-invalid' : 'is-valid'}`}
          id="meets"
          value={state.values.meets}
          onChange={change}
        />
        <div className="invalid-feedback">{state.errors.meets}</div>
      </div>

      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-secondary me-2" onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </form>
  );
};

export default CourseForm;
