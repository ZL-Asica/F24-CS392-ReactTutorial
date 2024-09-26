import React from 'react';

const terms = ['Fall', 'Winter', 'Spring'];

const TermSelector = ({ selectedTerm, setSelectedTerm }) => {
  return (
    <div className="btn-group">
      {terms.map(term => (
        <button
          key={term}
          className={`btn btn-outline-primary ${term === selectedTerm ? 'active' : ''}`}
          onClick={() => setSelectedTerm(term)}
        >
          {term}
        </button>
      ))}
    </div>
  );
};

export default TermSelector;
