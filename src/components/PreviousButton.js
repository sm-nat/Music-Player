import React from 'react';

export function PreviousButton({ onClick }) {
  return (
    <button className="control-button" onClick={onClick}>
      Previous
    </button>
  );
}

