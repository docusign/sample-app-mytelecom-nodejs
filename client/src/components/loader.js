import React from 'react';

export default function Loader({ visible }) {
  return (
    visible && (
      <div className="form-loader">
        <div className="spinner-border" role="status" />
      </div>
    )
  );
}
