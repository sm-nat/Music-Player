import React from 'react';

export function NextButton({ onClick }) {
  return (
    <button className="control-button" onClick={onClick}>
      Next
    </button>
  );
}

