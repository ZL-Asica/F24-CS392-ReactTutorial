import { useState } from 'react';
import { validateCourseData } from './courseDataValidators';

export const useFormData = (initialValues = {}) => {
  // Initialize the state with the form field values and errors
  const [state, setState] = useState({
    values: initialValues,
    errors: {}
  });

  // Update the state when the user changes the form fields
  const change = (evt) => {
    const { id, value } = evt.target;
    const error = validateCourseData(id, value);
    evt.target.setCustomValidity(error);

    setState((prevState) => ({
      values: { ...prevState.values, [id]: value },
      errors: { ...prevState.errors, [id]: error }
    }));
  };

  return [state, change];
};
