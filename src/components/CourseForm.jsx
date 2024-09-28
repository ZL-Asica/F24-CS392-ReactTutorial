import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '../utilities/useFormData';
import { useDbUpdate } from '../utilities/firebase';
import { Toast, ToastContainer } from 'react-bootstrap';

const CourseForm = ({ course, courseId }) => {
  const { term, number, title: initialTitle, meets: initialMeets } = course || {};
  const navigate = useNavigate();

  const [state, change] = useFormData({ title: initialTitle, meets: initialMeets });
  const [updateData, result] = useDbUpdate(`/courses/${courseId}`);
  const [showToast, setShowToast] = useState(false);
  const [isModified, setModified] = useState(false);

  // Check if the form has been modified
  useEffect(() => {
    if (initialTitle !== state.values.title || initialMeets !== state.values.meets) {
      setModified(true);
    } else {
      setModified(false);
    }
  }, [initialTitle, initialMeets, state.values]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, meets } = state.values;

    // Update the course in the database
    updateData({ title, meets });
  };

  // Redirect to the previous page on successful update
  useEffect(() => {
    if (result && !result.error) {
      // pop up success toast
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false),
        navigate(-1)
    }, 1000);
    }
  }, [result, navigate]);

  return (
    <>
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
          <button
            type="submit"
            className="btn btn-primary me-2"
            disabled={!isModified || state.errors.title || state.errors.meets}
          >
            Save
          </button>
          <button type="button" className="btn btn-secondary me-2" onClick={() => navigate(-1)}>Cancel</button>
        </div>

        {result && result.error &&
          <div className="alert alert-danger mt-3" role="alert">
            Error updating course: {result.error.message}
          </div>
        }

      </form>
      <ToastContainer position="top-end" className="p-3">
      <Toast onClose={() => setShowToast(false)} show={showToast} delay={1000} autohide>
        <Toast.Header>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>Course updated successfully!</Toast.Body>
      </Toast>
    </ToastContainer>
  </>
  );
};

export default CourseForm;
