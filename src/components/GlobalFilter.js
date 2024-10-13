import React from 'react';

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span>
      Search: {' '}
      <input
        value={filter || ''}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search..."
      />
    </span>
  );
};

export default GlobalFilter;
