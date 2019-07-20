import React from 'react';

const Filter = ({ handleFilterChange, filter }) => (
	<div>
        filter shown with <input onChange={handleFilterChange} value={filter} />
	</div>
);

export default Filter;